import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { callApi, resetPass } from "../../api/axios";
import Logo from "../../assets/images/logo.png";
import routes from "../../config/routes";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const [params] = useSearchParams();
  const [token] = useState(params.get("token"));
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

  const { t } = useTranslation();
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await callApi(() => resetPass(token || "", input.current?.value || ""))
      .then((data) => {
        toast.success("Mật khẩu đã được thay đổi", { autoClose: 3000 });
        setTimeout(() => {
          navigate(routes.login);
        }, 3000);
      })
      .catch(() => {
        toast.error("Email không tồn tại!");
      });
  };

  const handleChangeShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };
  return (
    <div className=" flex py-10 max-w-xl m-auto  flex-col gap-y-3 items-center shadow-custom mt-20 mb-44">
      <img className="w-40" src={Logo} alt="" />
      <h1 className="text-3xl">{t("text.resetPass")}</h1>
      <p>{t("text.resetPassDescription")}</p>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="relative">
          <input
            ref={input}
            title="Mật khẩu không được chứa khoảng trắng và có ít nhất 6 kí tự"
            required
            type={!isShowPassword ? "text" : "password"}
            pattern="^\S{6,}$"
            placeholder={t("input.placeholder.password")}
            className="outline outline-1 outline-gray-300 focus:outline-primary rounded-lg  p-4"
          />
          <div className="absolute right-3 top-2 p-2 rounded-full hover:bg-[#0000000a] transition-all duration-300">
            {isShowPassword ? (
              <FaEyeSlash size={20} onClick={handleChangeShowPassword} />
            ) : (
              <FaEye size={20} onClick={handleChangeShowPassword} />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="py-4 px-2 bg-gray-300 min-w-32 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
        >
          {t("button.continue")}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

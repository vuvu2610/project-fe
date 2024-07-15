import { useTranslation } from "react-i18next";
import BannerImg from "../../assets/images/bg.png";
import Button from "../../components/Button";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";

function Banner() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="bg-slate-100" >
      <div className="wrapper flex lg:flex-row flex-col bg-cover bg-no-repeat relative">
        <div className="lg:my-[80px] my-10 max-w-[577px] px-6">
          <h3 className="lg:text-[64px] text-[32px] font-semibold leading-[1]">
           {t("banner.title")}
          </h3>
          <p className="my-[32px]">
          {t("banner.description")}
          </p>

          <Button className="px-6 mb-4" onClick={() => navigate(routes.product)}>
          {t("button.buy")}
          </Button>

          <div className="flex items-center flex-wrap text-center">
            <div className="border-r border-[rgba(0, 0, 0, 0.10)] px-2">
              <span className=" text-3xl">200+</span>
              <p>{t("text.product")}</p>
            </div>
            <div className="border-r border-[rgba(0, 0, 0, 0.10)] px-2">
              <span className=" text-3xl">2,000+</span>
              <p>{t("text.quality")}</p>
            </div>
            <div className="px-2">
              <span className=" text-3xl">30,000+</span>
              <p>{t("text.customer")}</p>
            </div>
          </div>
        </div>
        <img src={BannerImg} alt="" />
        <FaStar size={28} className="absolute top-20 right-40 text-yellow-300 animate-bounce"/>
        <FaStar size={28} className="absolute top-20 right-[500px] text-yellow-300 animate-bounce"/>
        <FaStar size={28} className="absolute top-[200px] right-80 text-yellow-300 animate-bounce"/>
      </div>
      
    </div>
  );
}

export default Banner;

import { useTranslation } from "react-i18next";

function TopHeader() {
    const {t} = useTranslation();
    return (
        <>
            <div className="bg-black text-white py-[9px]">
                <div className="wrapper flex justify-center items-center">
                    <div className="text-xs lg:text-sm">
                        {t("text.topHeaderDes")}.
                        <span className="underline cursor-pointer font-semibold">{t("button.buy")}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopHeader;
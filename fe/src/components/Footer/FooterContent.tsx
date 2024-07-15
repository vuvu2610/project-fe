import { useTranslation } from 'react-i18next';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

function FooterContent() {
    const {t} = useTranslation();
    return (
        <div className="py-[50px] mt-0 border-b border-gray-300 flex lg:flex-row flex-col lg:gap-[110px] gap-6">
            <div className="w-[248px]">
                <h2 className="font-[IntegralCf] text-[24px]">SEEDLING</h2>
                <p className="my-[30px]">
                    {t("footer.main.description")}
                </p>
                <div className="flex gap-3">
                    <FaTwitter className="w-6 h-6" />
                    <FaFacebook className="w-6 h-6" />
                    <FaLinkedin className="w-6 h-6" />
                    <FaGithub className="w-6 h-6" />
                </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-4 grid-cols-2 text-left gap-6">
                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase "> {t("footer.main.company")}</h2>
                    <p> {t("nav.about-us")}</p>
                    <p> {t("footer.main.feature")}</p>
                    
                    <p> {t("footer.main.job")}</p>
                </div>

                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase "> {t("footer.main.help")}</h2>
                    <p> {t("footer.main.helpCustomer")}</p>
                    <p> {t("footer.main.deliveriesDetail")}</p>
                    <p> {t("footer.main.policy")}</p>
                </div>

                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase "> {t("footer.main.quesAndAns")}</h2>
                    <p> {t("footer.main.account")}</p>
                    <p> {t("footer.main.manageDeliveries")}</p>
                    <p> {t("footer.main.order")}</p>
                    <p> {t("footer.main.pay")}</p>
                </div>

                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase "> {t("footer.main.human")}</h2>
                    <p> {t("footer.main.tutorial")}</p>
                    <p>Blog</p>
                    <p>Youtube</p>
                </div>
            </div>
        </div>
    );
}

export default FooterContent;

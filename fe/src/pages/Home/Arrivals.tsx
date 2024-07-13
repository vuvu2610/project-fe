import { Link } from 'react-router-dom';
import Products from '../../components/Products';
import Title from '../../components/Title';
import { Product } from '../../types/types';
import config from '../../config';
import { useTranslation } from 'react-i18next';

interface ArrivalsProps {
    data: Product[];
}

const Arrivals: React.FC<ArrivalsProps> = ({ data }) => {
    const {t} = useTranslation();
    return (
        <div className="wrapper">
            <div className="py-[64px]">
                <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">{t("title.new-product")}</Title>
                <Products data={data} />
                <div className="text-center mt-[36px] pb-[64px] border-b">
                    <Link to = {config.routes.product} className="px-[54px] py-4 border rounded-[62px] w-full lg:w-auto  transition-all duration-300 hover:border-blue-400 ">
                        {t("button.read-more")}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Arrivals;
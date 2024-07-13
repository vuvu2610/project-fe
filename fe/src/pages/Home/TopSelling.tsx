import { Link } from 'react-router-dom';
import Products from '../../components/Products';
import Title from '../../components/Title';
import { Product } from '../../types/types'; // import Product from types.ts
import config from '../../config';
import { useEffect, useState } from 'react';
import { callApi } from '../../api/axios';
import { getBestSeller } from '../../api/homeApi';
import { useTranslation } from 'react-i18next';

const TopSelling: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const {t} = useTranslation();
    useEffect(() => {
        const fetchData = async () => {
            const result: Product[] = await callApi(() => getBestSeller());
            setData(result);
        };

        fetchData();
    }, []);
    return (
        <div className="wrapper">
            <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">{t("title.best-selling-seed")}</Title>

            <Products data={data} />
            <div className="text-center my-[36px]">
                <Link to={config.routes.product} className="px-[54px] py-4 border rounded-[62px] w-full lg:w-auto  transition-all duration-300 hover:border-blue-400 ">
                    {t("button.read-more")}
                </Link>
            </div>
        </div>
    );
}

export default TopSelling;
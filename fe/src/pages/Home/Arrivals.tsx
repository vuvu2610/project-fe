import { Link } from 'react-router-dom';
import Products from '../../components/Products';
import Title from '../../components/Title';
import { Product } from '../../types/types';
import config from '../../config';
import { callApi } from '../../api/axios';
import { getNewProduct } from '../../api/homeApi';
import { useEffect, useState } from 'react';

const Arrivals: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const result: Product[] = await callApi(() => getNewProduct());
            setData(result);
        };
    
        fetchData();
    }, []);
    
    return (
        <div className="wrapper">
            <div className="py-[64px]">
                <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">sản phẩm mới</Title>
                <Products data={data} />
                <div className="text-center mt-[36px] pb-[64px] border-b">
                    <Link to = {config.routes.product} className="px-[54px] py-4 border rounded-[62px] w-full lg:w-auto  transition-all duration-300 hover:border-blue-400 ">
                        Xem tất cả sản phẩm
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Arrivals;
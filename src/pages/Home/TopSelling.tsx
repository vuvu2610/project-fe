import { Link } from 'react-router-dom';
import Products from '../../components/Products';
import Title from '../../components/Title';
import { Product } from '../../types/types'; // import Product from types.ts
import config from '../../config';

interface TopSellingProps {
    data: Product[];
}

const TopSelling: React.FC<TopSellingProps> = ({ data }) => {
    return (
        <div className="wrapper">
            <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">Cây giống bán chạy</Title>

            <Products data={data} />
            <div className="text-center my-[36px]">
                <Link to={config.routes.product} className="px-[54px] py-4 border rounded-[62px] w-full lg:w-auto  transition-all duration-300 hover:border-blue-400 ">
                    Xem tất cả sản phẩm
                </Link>
            </div>
        </div>
    );
}

export default TopSelling;
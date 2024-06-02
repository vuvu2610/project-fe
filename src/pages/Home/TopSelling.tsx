import Products from '../../components/Products';
import Title from '../../components/Title';
import { Product } from '../../types/types'; // import Product from types.ts

interface TopSellingProps {
    data: Product[];
}

const TopSelling: React.FC<TopSellingProps> = ({ data }) => {
    return (
        <div className="wrapper">
            <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">Cây giống bán chạy</Title>

            <Products data={data} />
            <div className="text-center mt-[36px]">
                <button className="font-[Satoshi] px-[54px] py-4 border rounded-[62px] w-full lg:w-auto  mb-[64px]">
                    Xem tất cả
                </button>
            </div>
        </div>
    );
}

export default TopSelling;
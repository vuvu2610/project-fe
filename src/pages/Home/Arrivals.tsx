import Products from '../../components/Products';
import Title from '../../components/Title';
import { Product } from '../../types/types';

interface ArrivalsProps {
    data: Product[];
}

const Arrivals: React.FC<ArrivalsProps> = ({ data }) => {
    return (
        <div className="wrapper">
            <div className="py-[64px]">
                <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">sản phẩm mới</Title>
                <Products data={data} />
                <div className="text-center mt-[36px] pb-[64px] border-b">
                    <button className="px-[54px] py-4 border rounded-[62px] w-full lg:w-auto hover:scale-110 transition-all duration-300 hover:border-blue-400">
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Arrivals;
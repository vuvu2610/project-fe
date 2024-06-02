import ProductItem from './ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Product } from '../types/types'; 

interface ProductsProps {
    data: Product[];
}

const Products: React.FC<ProductsProps> = ({ data }) => {
    return (
        <div>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="py-3"
            >
                {data?.map((product) => (
                    <SwiperSlide key={product?.id} className=" min-w-[270px]">
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Products;
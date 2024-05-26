import { Swiper, SwiperSlide } from 'swiper/react';
import listProduct from "../../api/products.json";
import CardProduct from "../../components/CardProduct";
import Title from "../../components/Title";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';

function Arrivals({}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <div className="wrapper">
      <div className="py-[64px]">
        <Title className="text-center text-[32px] lg:text-[40px] mb-[64px]">NEW ARRIVALS</Title>
        {/* <CardProduct data={data} /> */}
        <Swiper
                spaceBetween={20}
                slidesPerView={windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 3 : 2}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="!py-3 !px-20"
            >
                {listProduct?.map((product) => (
                    <SwiperSlide key={product?.id}>
                        <CardProduct data={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        <div className="text-center mt-[36px] pb-[64px] border-b">
          <button className="font-[Satoshi] px-[54px] py-4 border rounded-[62px] w-[200px] lg:w-auto">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Arrivals;

import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import products from "../api/product.json";
import routes from "../config/routes";
import Title from "../components/Title";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { reviews } from "../constants";
import { Product } from "../types/types";
import ProductItem from "../components/ProductItem";

interface Props {}

function ProductDetail(_props: Props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Product>();

  useEffect(() => {
    if (!isValidId) {
      navigate(routes["page-not-found"]);
    }
    setData(products.find((product) => {
      const parsId = id && parseInt(id);
      return product.id === parsId;
    }));
    window.scrollTo(0, 0);
  }, [id]);

  const isValidId =
    id &&
    !isNaN(parseInt(id)) &&
    products.some((product) => product.id === parseInt(id));

  function handleColorClick(color: string) {
    setSelectedColor(color);
  }

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  function handleAddToCart(
    data:
      | {
        id: number;
        title: string;
        image: string;
        rating: number;
        price: number;
        }
      | undefined
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="mb-[124px]">
      <div className="wrapper">
        {/* <Breadcrumb className="capitalize">{data?.category}</Breadcrumb> */}

        <div className="flex flex-col lg:flex-row gap-14 mt-9 pb-8">
          <div className=" w-[300px] mx-auto grid place-items-center">
            <img
              src={data?.image}
              alt=""
              className="w-full rounded-[20px]"
            />
          </div>

          <div className="flex-1">
            {/* Details */}
            <Title className="text-[40px] mb-3 line-clamp-2">
              {data?.title}
            </Title>
            <div className="flex gap-x-2 items-center mt-2">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      color={
                        data && index + 1 <= data.rating ? "#ffc633" : undefined
                      }
                    ></FaStar>
                  );
                })}
              <span>{data && data.rating}/ 5</span>
            </div>
            <span className="my-3 block  text-[32px]">
              {data?.price} VND
            </span>
     
            <p className="pb-4 border-b">{data?.title}</p>

           
            <button
              onClick={() => handleAddToCart(data)}
              className="px-[70px] py-4 bg-black text-white rounded-[62px] mt-4"
            >
              Add to card
            </button>
          </div>
        </div>

        {/* Review */}
        <div className="py-8 border-t">
          <div className="flex justify-between items-center pb-8">
            <div className="flex gap-1 items-center">
              <h3 className=" text-xl">All Reviews</h3>
              <span>(5)</span>
            </div>
            <button className="block py-3 px-5 bg-black text-white rounded-[62px]">
              Write a Review
            </button>
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="py-3"
          >
            {reviews?.map((review) => (
              <SwiperSlide key={review?.id} className="min-w-[310px]">
                <div className="rounded-[20px] border py-[28px] px-[32px]">
                  <div className="flex gap-x-2 items-center mt-2">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => {
                        return (
                          <FaStar
                            key={index}
                            color={
                              data && index + 1 <= data.rating ? "#ffc633" : undefined
                            }
                          ></FaStar>
                        );
                      })}
                    <span>{data && data.rating}/ 5</span>
                  </div>
                  <div className="flex my-5 items-center gap-2">
                    <span className="">{review?.name}</span>
                    <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="" className="w-6 h-6 object-cover" />
                  </div>
                  <p className="line-clamp-4">{review?.review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
          
      {/* Top selling */}
      <div className="mt-[60px] wrapper">
      <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">Top Selling</Title>
      <ul className="flex-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-10 auto-rows-max">
          {products.map((product, index) => (
            <ProductItem product={product} key={index}/>
          ))}
        </ul>
        </div>
    </div>
  );
}

export default ProductDetail;

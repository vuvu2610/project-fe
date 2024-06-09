import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import products from "../api/products.json";
import CardProduct from "../components/CardProduct";
import routes from "../config/routes";
import Title from "../components/Title";
import { FaCheck, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { reviews } from "../constants";

interface Props {}

function ProductDetail(_props: Props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [data] = useState(
    products.find((product) => {
      const parsId = id && parseInt(id);
      return product.id === parsId;
    })
  );

  const isValidId =
    id &&
    !isNaN(parseInt(id)) &&
    products.some((product) => product.id === parseInt(id));

  useEffect(() => {
    if (!isValidId) {
      navigate(routes["page-not-found"]);
    }
  }, []);

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
          name: string;
          price: number;
          category: string;
          rate: number;
        }
      | undefined
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="my-[124px]">
      <div className="wrapper">
        {/* <Breadcrumb className="capitalize">{data?.category}</Breadcrumb> */}

        <div className="flex flex-col lg:flex-row gap-14 mt-9 pb-8">
          <div className="lg:w-[450px] w-[300px] mx-auto">
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt=""
              className="w-full rounded-[20px]"
            />
          </div>

          <div className="flex-1">
            {/* Details */}
            <Title className="text-[40px] mb-3 line-clamp-2">
              {data?.name}
            </Title>
            <div className="flex gap-x-2 items-center mt-2">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      color={
                        data && index + 1 <= data.rate ? "#ffc633" : undefined
                      }
                    ></FaStar>
                  );
                })}
              <span>{data && data.rate}/ 5</span>
            </div>
            <span className="my-3 block  text-[32px]">
              ${data?.price}
            </span>
            <span className="my-3 block  text-base capitalize">
              Category: {data?.category}
            </span>
            <p className="pb-4 border-b">{data?.name}</p>

            {/* Choose Color */}
            <div className="py-4 border-b">
              <p className="mb-2">Select Colors</p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-[37px] h-[37px] cursor-pointer rounded-full bg-[#4F4631] ${
                    selectedColor === "#4F4631"
                      ? "text-white"
                      : "text-transparent"
                  }`}
                  onClick={() => handleColorClick("#4F4631")}
                >
                  <FaCheck className="w-[20px] mx-auto h-[37px]" />
                </div>
                <div
                  className={`w-[37px] h-[37px] cursor-pointer rounded-full bg-[#314F4A] ${
                    selectedColor === "#314F4A"
                      ? "text-white"
                      : "text-transparent"
                  }`}
                  onClick={() => handleColorClick("#314F4A")}
                >
                  <FaCheck className="w-[20px] mx-auto h-[37px]" />
                </div>
                <div
                  className={`w-[37px] h-[37px] cursor-pointer rounded-full bg-[#31344F] ${
                    selectedColor === "#31344F"
                      ? "text-white"
                      : "text-transparent"
                  }`}
                  onClick={() => handleColorClick("#31344F")}
                >
                  <FaCheck className="w-[20px] mx-auto h-[37px]" />
                </div>
              </div>
            </div>

            {/* Choose Size */}
            <div className="py-4 border-b">
              <p className="mb-2">Choose Size</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className={`block cursor-pointer px-6 py-3 rounded-[62px] font-semibold ${
                    selectedSize === "Small"
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black"
                  }`}
                  onClick={() => handleSizeClick("Small")}
                >
                  Small
                </span>
                <span
                  className={`block cursor-pointer px-6 py-3 rounded-[62px] font-semibold ${
                    selectedSize === "Medium"
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black"
                  }`}
                  onClick={() => handleSizeClick("Medium")}
                >
                  Medium
                </span>
                <span
                  className={`block cursor-pointer px-6 py-3 rounded-[62px] font-semibold ${
                    selectedSize === "Large"
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black"
                  }`}
                  onClick={() => handleSizeClick("Large")}
                >
                  Large
                </span>
                <span
                  className={`block cursor-pointer px-6 py-3 rounded-[62px] font-semibold ${
                    selectedSize === "X-Large"
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black"
                  }`}
                  onClick={() => handleSizeClick("X-Large")}
                >
                  X-Large
                </span>
              </div>
            </div>
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
                              data && index + 1 <= data.rate ? "#ffc633" : undefined
                            }
                          ></FaStar>
                        );
                      })}
                    <span>{data && data.rate}/ 5</span>
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
      <div className="mt-[60px]">
      <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">Top Selling</Title>
      <ul className="flex-1 grid-cols-3 grid gap-10 auto-rows-max">
          {products.map((product, index) => (
            <CardProduct key={index} data={product} />
          ))}
        </ul>
        </div>
    </div>
  );
}

export default ProductDetail;

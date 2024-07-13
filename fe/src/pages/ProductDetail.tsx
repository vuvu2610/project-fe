import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { FaShippingFast, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { reviews } from "../constants";
import { Product } from "../types/types";
import ProductItem from "../components/ProductItem";
import { addToCart, callApi, getProduct, currentUser, getCartByUser } from '../api/axios'
import { toast } from "react-toastify";
import { getBestSeller } from "../api/homeApi";
import { CiViewList } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import Button from "../components/Button";
import ActiveQuantity from "../components/ActiveQuantity";
import StarRating from "../components/StarRating";
import { useDispatch } from "react-redux";
import { updateCartCount } from '../redux/appSlice';

interface Props { }

function ProductDetail(_props: Props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };


  const [data, setData] = useState<Product>();
  const [topSelling, setTopSelling] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await callApi(() => getProduct(Number(id)));
      const topSellingProduct = await callApi(() => getBestSeller());
      setData(product);
      setTopSelling(topSellingProduct);
      window.scrollTo(0, 0);
    };

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    const addCart = async () => {
      try {
        console.log(id)
        await callApi(() => addToCart({ productId: Number(id), userId: currentUser?.id, quantity: quantity }));
        const number = await callApi(() => getCartByUser(currentUser?.id));
        dispatch(updateCartCount(number.length));
        toast.success('Bạn đã thêm sản phẩm thành công!');
      } catch (error: any) {
        if (error.response.status === 403) {
          toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        }
      }
    };
    addCart();
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
              {data?.name}
            </Title>
            <div className="flex gap-x-2 items-center mt-2">
            <StarRating rating={data?.rating} />
              <span>{data?.rating ?? 0}/ 5</span>
            </div>
            <span className="my-3 block  text-[32px]">
              {data?.price} VND
            </span>
            <p className="text-[#003b31] font-semibold pb-4">Số lượng còn trong kho: <span className="font-normal">{data?.remainingQuantity}</span></p>
 
            <p className="pb-4 border-b">{data?.description}</p>
            <div className="flex items-center gap-4 pt-4">
              <ActiveQuantity className="" onQuantityChange={handleQuantityChange} quantity={quantity}></ActiveQuantity>
              <Button onClick={handleAddToCart} className="">
                <strong className="">Thêm vào giỏ hàng</strong>
              </Button>
            </div>

          </div>
          <div className="border w-64 rounded-md flex flex-col gap-3 p-2 text-sm">
            <div className="uppercase text-[#003b31] text-lg text-center">Chăm sóc khách hàng</div>
            <div className="flex border-t py-1 justify-center items-center gap-2">
              <CiViewList size={60} color="#003b31" />
              <p>Đảm bảo sản phẩm <span className="font-semibold">đạt chuẩn ATVSTP, tươi ngon</span></p>
            </div>
            <div className="flex border-t py-1 justify-center items-center gap-2">
              <AiTwotoneLike size={60} color="#003b31" />
              <p>Vị ngon tinh tế, mang đúng đặc trưng vùng miền</p>
            </div>
            <div className="flex border-t py-1 justify-center items-center gap-2">
              <FaShippingFast size={60} color="#003b31" />
              <p><span className="font-semibold">Miễn phí </span>vận chuyển cho đơn hàng từ 350.000đ</p>
            </div>
            <div className="flex border-t py-1 justify-center items-center gap-2">
              <BsClockHistory size={40} color="#003b31" />
              <p>Giao hàng nhanh gọn trong 3h</p>
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="py-8 border-t">
          <div className="flex justify-between items-center pb-8">
            <div className="flex gap-1 items-center">
              <h3 className=" text-xl">All Reviews</h3>
              <span>(5)</span>
            </div>
            <Button>
              Write a Review
            </Button>
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
          {topSelling.slice(0, 12).map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetail;

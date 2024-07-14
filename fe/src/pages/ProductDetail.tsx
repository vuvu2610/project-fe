import { FormEvent, useEffect, useRef, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { FaEdit, FaShippingFast, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
    addToCart,
    callApi,
    editReview,
    getCartByUser,
    getProduct,
    getReviewsByProductId,
    registerReview,
} from "../api/axios";
import { getBestSeller } from "../api/homeApi";
import ActiveQuantity from "../components/ActiveQuantity";
import Button from "../components/Button";
import Pagianate from "../components/PagianateNavBar/Paginate";
import ProductItem from "../components/ProductItem";
import StarRating from "../components/StarRating";
import ActiveStarRating from "../components/StarRatingActive";
import Title from "../components/Title";
import routes from "../config/routes";
import { RootState } from "../redux/store";
import { Product, Review, ReviewRequestDto } from "../types/types";
import { convertLocalDateTimeToDate } from "../utils/helper";
import { Emitter } from "../eventEmitter/EventEmitter";

interface Props {}

function ProductDetail(_props: Props) {
    const { id } = useParams();
    const [quantity, setQuantity] = useState<number>(1);
    const [reviews, setReviews] = useState<Array<Review>>([]);
    const formReview = useRef<HTMLFormElement>(null);

    // page use for review
    const [page, setPage] = useState<number>(0);
    const textReview = useRef<HTMLTextAreaElement>(null);
    const submitReview = useRef<HTMLButtonElement>(null);
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const numberOfPage = 5;

    const [rating, setRating] = useState(5);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    const showEditReview = (
        originReview: string | null,
        originalRating: number | null
    ) => {
        function handleEditRating(rating: number): void {
            if (document.getElementById("swal-input2")) {
                const input = document.getElementById(
                    "swal-input2"
                ) as HTMLInputElement;
                input.value = rating.toString();
            }
        }

        return MySwal.fire({
            title: (
                <>
                    <p>Edit review</p>
                    <ActiveStarRating
                        rating={originalRating || 1}
                        setRating={handleEditRating}
                        className=""
                    />
                </>
            ),
            html: '<input id="swal-input2" hidden class="swal2-input"></input>',
            input: "textarea",
            inputValue: originReview,
            inputAttributes: {
                required: "true",
            },
            showCancelButton: true,
            confirmButtonText: "Edit review",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            preConfirm: () => {
                const content = Swal.getInput()?.value;
                const editRating = Swal.getPopup()!.querySelector(
                    "#swal-input2"
                ) as HTMLInputElement;

                return { content, editRating: editRating.value };
            },
        });
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const [data, setData] = useState<Product>();
    const [topSelling, setTopSelling] = useState<Product[]>([]);

    const showSwal = () => {
        return Swal.fire({
            title: "Bạn chưa đăng nhập?",
            text: "Hãy đăng nhập để tiếp tục nhé",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng nhập",
        });
    };

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

    useEffect(() => {
        const fetchReviews = async () => {
            const result: Review[] = await callApi(() =>
                getReviewsByProductId(Number(id))
            );
            setReviews(result);
        };
        fetchReviews();
    }, []);

    function handleAddToCart() {
        const addCart = async () => {
            try {
                await callApi(() =>
                    addToCart({
                        productId: Number(id),
                        userId: Number(user?.id),
                        quantity: quantity,
                    })
                );
                Emitter.emit("updateCartNumber");
                toast.success("Bạn đã thêm sản phẩm thành công!");
            } catch (error: any) {
                if (error.response.status === 403) {
                    toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
                }
            }
        };
        addCart();
    }

    async function handleSubmitReviews(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!textReview.current?.value.trim()) {
            textReview.current?.setCustomValidity(
                "Content must be at least 1 character diff space"
            );
            return;
        }

        if (!user) {
            showSwal().then((value) => {
                if (value.isConfirmed) {
                    navigate(routes.login);
                }
            });
            return;
        }

        const data: ReviewRequestDto = {
            productId:
                formReview.current && Number(formReview.current.productId.value),
            userId: formReview.current && Number(formReview.current.userId.value),
            rating: rating,
            content: textReview.current.value,
        };

        await registerReview(data).then((data) => {
            if (data) {
                toast.success("Review successfully!");
                if (textReview.current) {
                    textReview.current.value = "";
                }
                setReviews((prev) => [data, ...prev]);
            }
        });
    }

    return (
        <div className="mb-[124px]">
            <div className="wrapper">
                {/* <Breadcrumb className="capitalize">{data?.category}</Breadcrumb> */}

                <div className="flex flex-col lg:flex-row gap-14 mt-9 pb-8">
                    <div className=" w-[300px] mx-auto grid place-items-center">
                        <img src={data?.image} alt="" className="w-full rounded-[20px]" />
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
                        <span className="my-3 block  text-[32px]">{data?.price} VND</span>
                        <p className="text-[#003b31] font-semibold pb-4">
                            Số lượng còn trong kho:{" "}
                            <span className="font-normal">{data?.remainingQuantity}</span>
                        </p>

                        <p className="pb-4 border-b">{data?.description}</p>
                        <div className="flex items-center gap-4 pt-4">
                            <ActiveQuantity
                                className=""
                                onQuantityChange={handleQuantityChange}
                                quantity={quantity}
                            ></ActiveQuantity>
                            <Button onClick={handleAddToCart} className="">
                                <strong className="">Thêm vào giỏ hàng</strong>
                            </Button>
                        </div>
                    </div>
                    <div className="border w-64 rounded-md flex flex-col gap-3 p-2 text-sm">
                        <div className="uppercase text-[#003b31] text-lg text-center">
                            Chăm sóc khách hàng
                        </div>
                        <div className="flex border-t py-1 justify-center items-center gap-2">
                            <CiViewList size={60} color="#003b31" />
                            <p>
                                Đảm bảo sản phẩm{" "}
                                <span className="font-semibold">
                  đạt chuẩn ATVSTP, tươi ngon
                </span>
                            </p>
                        </div>
                        <div className="flex border-t py-1 justify-center items-center gap-2">
                            <AiTwotoneLike size={60} color="#003b31" />
                            <p>Vị ngon tinh tế, mang đúng đặc trưng vùng miền</p>
                        </div>
                        <div className="flex border-t py-1 justify-center items-center gap-2">
                            <FaShippingFast size={60} color="#003b31" />
                            <p>
                                <span className="font-semibold">Miễn phí </span>vận chuyển cho
                                đơn hàng từ 350.000đ
                            </p>
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
                            <span>({reviews.length})</span>
                        </div>
                    </div>
                    {/*
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
          </Swiper> */}
                    <form
                        ref={formReview}
                        onSubmit={(e) => handleSubmitReviews(e)}
                        className="flex flex-col items-end gap-y-3"
                    >
                        <input type="text" name="productId" value={id} hidden />
                        <input type="text" name="userId" value={user?.id} hidden />
                        <input type="text" name="rating" value={rating} hidden />
                        <textarea
                            onChange={(e) => e.target.setCustomValidity("")}
                            ref={textReview}
                            name="content"
                            required
                            className="w-full outline p-3 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-gray-500"
                        ></textarea>

                        <div className="w-full flex justify-between">
                            <ActiveStarRating
                                rating={rating}
                                setRating={setRating}
                                className=""
                            />
                            <button
                                ref={submitReview}
                                type="submit"
                                className="w-fit bg-gray-300 px-4 py-2  rounded-xl"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    {reviews.length === 0 ? (
                        <div className="text-center text-gray-400 mt-3">
                            Chưa có bình luận nào.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-6 mt-6">
                            {reviews
                                .slice(page * numberOfPage, page * numberOfPage + numberOfPage)
                                .map((review) => (
                                    <>
                                        <div className="flex gap-x-4 items-start">
                                            <FaUser
                                                size={40}
                                                className="bg-gray-300 rounded-full p-2"
                                            />
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex gap-x-3 items-center">
                                                    <strong>{review.userName}</strong>
                                                    <span className="text-gray-500">
                            {convertLocalDateTimeToDate(
                                review.updated
                            ).toLocaleDateString()}
                          </span>
                                                    {review.userId == user?.id && (
                                                        <FaEdit
                                                            size={20}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                showEditReview(
                                                                    review.content,
                                                                    review.rating
                                                                ).then(async (data) => {
                                                                    if (data.isConfirmed) {
                                                                        const editReviewData = {
                                                                            id: review.id,
                                                                            content: data.value.content,
                                                                            rating: Number(data.value.editRating),
                                                                        };

                                                                        console.log(editReviewData);

                                                                        await callApi(() =>
                                                                            editReview(editReviewData)
                                                                        ).then((data) => {
                                                                            if (data) {
                                                                                toast.success("Cập nhật thành công!");
                                                                                setReviews((prev) =>
                                                                                    prev.map((r) => {
                                                                                        if (r.id == data.id) {
                                                                                            r.content = data.content;
                                                                                            r.rating = data.rating;
                                                                                        }
                                                                                        return r;
                                                                                    })
                                                                                );
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <StarRating rating={review.rating}></StarRating>
                                                <p>{review.content}</p>
                                            </div>
                                        </div>
                                    </>
                                ))}

                            <Pagianate
                                onPageChange={function (numberPage: number): void {
                                    setPage(numberPage);
                                }}
                                itemsLength={reviews.length}
                                numberItemOnPage={5}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Top selling */}
            <div className="mt-[60px] wrapper">
                <Title className="text-center text-[32px] lg:text-[40px] mb-[64px] uppercase">
                    Top Selling
                </Title>
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

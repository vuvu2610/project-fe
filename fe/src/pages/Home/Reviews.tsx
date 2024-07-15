import Title from "../../components/Title";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Review } from "../../types/types";
import {Swiper,  SwiperSlide } from "swiper/react";
import Card from "../../components/Card";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getTopReview } from "../../api/axios";

function Reviews() {
  const [reviews, setReviews] = useState<Review[]|null>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchReviews = async () => {
        const res = await getTopReview(5);
        setReviews(res);
        };
    fetchReviews();
  }, [t]);
  return (
    <div className="wrapper">
      <div className="mt-[64px]">
        <Title className=" text-[32px] lg:text-[40px] text-center lg:text-left">
          {t("title.comment")}
        </Title>
        <div>
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
              <SwiperSlide key={review?.id} className="min-w-[310px]" >
                <Card {...review}  />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Reviews;

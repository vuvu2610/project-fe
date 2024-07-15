import { Review } from "../types/types";
import StarRating from "./StarRating";
import { FaUserAlt } from "react-icons/fa";

function Card(review: Review) {
  return (
    <div className="rounded-[20px] border py-[28px] px-[32px]">
      <StarRating rating={review.rating} />
      <div className="flex my-5 items-center gap-2">
        <FaUserAlt size={20} />
        <span>{review.userName}</span>
      </div>
      <p className="line-clamp-4">{review.content}</p>
    </div>
  );
}

export default Card;

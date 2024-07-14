import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  className: string;
}

const ActiveStarRating = ({
  rating,
  setRating,
  className,
}: StarRatingProps) => {
  const [ratingSelf, setRatingSelf] = useState(rating);
  const handleStarClick = (index: number) => {
    if (setRating) {
      setRating(index+1);
      
    }
    setRatingSelf(index + 1);
  };

  const fullStars = Math.floor(ratingSelf);
  const emptyStars = 5 - fullStars;

  return (
    <div className={`flex text-[#FFC633] items-center gap-[6px] ${className}`}>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          className="cursor-pointer"
          size={24}
          key={index}
          onClick={() => handleStarClick(index)}
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar
          className="cursor-pointer"
          size={24}
          key={index + fullStars}
          onClick={() => handleStarClick(index + fullStars)}
        />
      ))}
    </div>
  );
};

export default ActiveStarRating;

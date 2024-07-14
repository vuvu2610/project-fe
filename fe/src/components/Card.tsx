import StarRating from './StarRating';

interface CardProps {
    review: {
        id: number;
        rating: number;
        name: string;
        review: string;
    };
}

function Card({ review }: CardProps) {
    return (
        <div className="rounded-[20px] border py-[28px] px-[32px]">
            <StarRating rating={review?.rating} />
            <div className="flex my-5 items-center gap-2">
                <span>{review?.name}</span>
                <img  alt="" className="w-6 h-6 object-cover" />
            </div>
            <p className="line-clamp-4">{review?.review}</p>
        </div>
    );
}

export default Card;
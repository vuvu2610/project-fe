import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import routes from "../config/routes";
import { Product } from "../types/types";

interface Props {
  data: Product;
}

function CardProduct(props: Props) {
  const { data } = props;
  
  return (
    <div className="rounded-3xl shadow-lg   overflow-hidden">
      <Link to={`${routes.product}/${data.id}`} state={{data}}>
        <img
          src={data.image}
          alt={data.title}
          className=" w-full hover:scale-[1.1] ease-in-out duration-300 h-[287px] object-cover"
        />
      </Link>
      <p className="mt-5 p-4 pt-0">{data.title}</p>
      <div className="flex gap-x-2 items-center mt-2 p-4 pt-0">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            return (
              <FaStar 
                key={index}
                color={index + 1 <= data.rating ? "#ffc633" : undefined}
              ></FaStar>
            );
          })}
        <span>{data.rating}/ 5</span>
      </div>
      <h4 className="text-2xl mt-2 p-4 pt-0">${data.price}</h4>
    </div>
  );
}

export default CardProduct;

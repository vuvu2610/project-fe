import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import routes from "../config/routes";

interface Product {
  id: number;
  name: string;
  rate: number;
  price: number;
  category: string;
}

interface Props {
  data: Product;
}

function CardProduct(props: Props) {
  const { data } = props;
  
  return (
    <div className="rounded-3xl shadow-lg p-4 pt-0">
      <Link to={`${routes.product}/${data.id}`} state={{data}}>
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt={data.name}
          className=" rounded-[20px] w-full hover:scale-[1.1] ease-in-out duration-300 h-[287px] object-cover"
        />
      </Link>
      <p className="mt-5">{data.name}</p>
      <div className="flex gap-x-2 items-center mt-2">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            return (
              <FaStar 
                key={index}
                color={index + 1 <= data.rate ? "#ffc633" : undefined}
              ></FaStar>
            );
          })}
        <span>{data.rate}/ 5</span>
      </div>
      <h4 className="text-2xl mt-2">${data.price}</h4>
    </div>
  );
}

export default CardProduct;

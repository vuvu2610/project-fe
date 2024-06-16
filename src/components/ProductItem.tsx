import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Product } from '../types/types';
import routes from '../config/routes';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className="cursor-pointer overflow-hidden shadow p-4 rounded-[20px]">
            <Link to={'/shop/' + product?.id} className="overflow-hidden rounded-[20px]">
                <img
                    src={product?.image}
                    alt=""
                    className="rounded-[20px] w-full hover:scale-[1.1] ease-in-out duration-300 h-[287px] object-cover"
                />
            </Link>

            <div className="mt-4 space-y-2">
                <h3 className=" capitalize line-clamp-1">{product?.title}</h3>
                <div className="flex gap-2">
                    <StarRating rating={product?.rating} />
                    <span className="">
                        {product?.rating}/ <span className="text-[rgba(0, 0, 0, 0.60)]">5</span>{' '}
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className=" text-xl font-semibold">${product?.price}</span>
                    <span className=" font-semibold">Đã bán: {product?.purchase}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
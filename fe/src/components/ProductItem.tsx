import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Product } from '../types/types';
import routes from '../config/routes';
import { useState } from 'react';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="cursor-pointer overflow-hidden shadow p-4 rounded-[20px]">

            <Link to={`${routes.product}/${product?.id}`} className="overflow-hidden rounded-[20px]">

                <img
                    src={product?.image}
                    loading="lazy"
                    alt=""
                    onLoad={() => setLoaded(true)}
                    className={`rounded-[20px] w-full h-[287px] object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </Link>

            <div className="mt-4 space-y-2">
                <h3 className=" capitalize line-clamp-1">{product?.name}</h3>
                <div className="flex gap-2">
                    <StarRating rating={product?.rating} />
                    <span className="">
                        {product?.rating}/ <span className="text-[rgba(0, 0, 0, 0.60)]">5</span>{' '}
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className=" font-semibold">{product?.price} VND</span>
                    <span className=" font-semibold">Đã bán: {product?.quantitySold}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
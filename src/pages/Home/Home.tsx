import { useEffect } from 'react';

import Reviews from '../../components/Reviews';
import Arrivals from './Arrivals';
import Banner from './Banner';
import Brand from './Brand';
import Browser from './Browser';
import TopSelling from './TopSelling';
import products from '../../api/product.json';
import { Product } from '../../types/types'; // import Product from types.ts

const Home: React.FC = () => {
    const productsArrivals: Product[] = products.slice(0, 10);
    const productsSelling: Product[] = products.slice(10);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mt-[100px] mb-[160px]">
            <Banner />
            <Brand />
            <Arrivals data={productsArrivals} />
            <TopSelling data={productsSelling} />
            <Browser />
            <Reviews />
        </div>
    );
}

export default Home;
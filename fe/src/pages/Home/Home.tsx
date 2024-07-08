import { useEffect } from 'react';

import Reviews from './Reviews';
import Arrivals from './Arrivals';
import Banner from './Banner';
import Browser from './SeedlingType';
import TopSelling from './TopSelling';
import products from '../../api/product.json';
import { Product } from '../../types/types'; // import Product from types.ts

const Home: React.FC = () => {
    const productsArrivals: Product[] = products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    const productsSelling: Product[] = products.sort((a, b) => b.purchase - a.purchase).slice(0, 5);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mb-[160px]">
            <Banner />
            <Arrivals data={productsArrivals} />
            <TopSelling data={productsSelling} />
            <Browser />
            <Reviews />
        </div>
    );
}

export default Home;
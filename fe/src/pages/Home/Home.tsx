import { useEffect } from 'react';

import Reviews from './Reviews';
import Arrivals from './Arrivals';
import Banner from './Banner';
import Browser from './SeedlingType';
import TopSelling from './TopSelling';
import products from '../../api/product.json';
import { Product } from '../../types/types'; // import Product from types.ts

const Home: React.FC = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mb-[160px]">
            <Banner />
            <Arrivals />
            <TopSelling/>
            <Browser />
            <Reviews />
        </div>
    );
}

export default Home;
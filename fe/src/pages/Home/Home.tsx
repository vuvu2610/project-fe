import { useEffect } from 'react';

import Arrivals from './Arrivals';
import Banner from './Banner';
import Reviews from './Reviews';
import Browser from './SeedlingType';
import TopSelling from './TopSelling';

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
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TopHeader from './TopHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const isLogin = localStorage.getItem('user');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`${isSticky ? 'sticky top-0 left-0 right-0 z-20' : ''}`}>
                {!isLogin && <TopHeader />}
                <Navbar />
            </header>
            <Outlet />
        </>
    );
}

export default Header;
import { CiSearch, CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import routes from "../config/routes";

interface MenuItem {
    name: string;
    path?: string;
}

function Header() {
    const location = useLocation();
    const listIcon: JSX.Element[] = [
        <CiSearch size={20} />,
        <IoBagOutline size={20} />,
        <CiUser size={20} />
    ];
    const listMenu: MenuItem[] = [
        { name: 'Home', path: routes.home },
        { name: 'Product', path: routes.product },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ];
    return (
        <div className='w-full px-[10%] py-10 mx-auto flex justify-between h-full bg-white shadow-sm'>
            <a href="#" className="font-bold text-xl text-primary">Matcha</a>
            <ul className='flex gap-5 justify-center items-center'>
                {listMenu.map((menu, index) => (
                    <Link to={menu.path || '/'} key={index}>
                        <li className={`cursor-pointer hover:text-primary transition-all duration-300 ${location.pathname === menu.path ? 'text-primary' : ''} `}>{
                            menu.name
                        }</li>
                    </Link>
                ))}
            </ul>
            <div className="flex items-center justify-center gap-4">
                {listIcon.map((icon, index) => (
                    <div key={index} className='p-2 bg-gray-200 rounded-full hover:bg-primary transition-all duration-500'>
                        {icon}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Header

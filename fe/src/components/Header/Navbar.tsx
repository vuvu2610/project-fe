import { useState, useEffect, useRef, FC } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";
import navItems from "../../api/navItems.json";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {logoutUser} from "../../api/axios"

interface NavItem {
  title: string;
  to: string;
}

interface State {
  auth: {
    user: any;
  };
  allCart: {
    cartsValue: any[];
  };
}

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLoggedIn");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const activeNavLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "text-base  underline" : "text-base ";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="py-4 bg-white">
      <div className="wrapper">
        <div className="flex justify-between items-center gap-8">
          <Link to="/" className="font-[IntegralCf] text-[24px]">
            SEEDLING
          </Link>

          <ul className="hidden lg:flex space-x-12">
            {navItems.map(({ title, to }) => (
              <NavLink to={to} className={activeNavLink} key={to}>
                {title}
              </NavLink>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-[20px]">
              <div className="relative">
                <Link to="/cart">
                  <IoCartOutline className="w-7 h-7 mt-1" />
                </Link>
              </div>
              {isLogin ? (<button className="hidden lg:block" onClick={logoutUser}>
                Logout <AiOutlineLogin className="w-6 h-6 inline-block" />
              </button>
              ) : (<Link to={"/login"} className="hidden lg:block" >
                Login <AiOutlineLogin className="w-6 h-6 inline-block" />
              </Link>
              )}
            </div>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <FaXmark className="w-6 h-6 mt-2" />
                ) : (
                  <FaBars className="w-6 h-6 mt-2" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          ref={menuRef}
          className={`bg-black w-custom-width h-full text-white ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
            }`}
        >
          <Link
            to="/"
            className="font-[IntegralCf] block text-[24px] py-4 px-4"
          >
            FE.SHOPIFY
          </Link>
          <ul className="space-y-2 border-b ">
            {navItems.map(({ title, to }) => (
              <Link to={to} key={to}>
                <li className="py-3 px-4 hover:bg-[#484a4b]">{title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

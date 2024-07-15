import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

interface SimpleHeaderLayoutProps {
  children: ReactNode;
}

function SimpleHeaderLayout({ children }: SimpleHeaderLayoutProps) {
  return (
    <div className="flex justify-center flex-col">
      <div className="h-100px flex pl-60 py-2 mb-10">
        <Link to="/" className="font-[IntegralCf] text-[24px]">
          <img src={Logo} alt="" className="w-40" />
        </Link>
      </div>
      <div className="w-[50%] mx-auto">{children}</div>
    </div>
  );
}

export default SimpleHeaderLayout;

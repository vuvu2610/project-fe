import { IoGift } from "react-icons/io5";
import { Link } from "react-router-dom";
import routes from "../../config/routes";

function TopHeader() {
    return (
        <>
            <div className="bg-black text-white py-[9px]">
                <div className="wrapper flex justify-center items-center">
                    <div className="text-xs lg:text-sm">
                        Đăng ký và được giảm giá 20% cho đơn hàng đầu tiên của bạn.
                        <Link to={routes.product} className="underline cursor-pointer font-semibold">Mua ngay</Link>
                        <IoGift className="inline-block ml-4 text-pink-400 animate-bounce" size={20}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopHeader;
import Promotion from "../../assets/images/promotion.png";
import CartDetail from "./CartDetail";
function CartPage() {
  return (
    <div className="pt-[136px] pb-[160px] bg-[#f5f5f5]">
      <div className="wrapper px-5 ">
        <div className="flex justify-between items-center px-8 py-4 mb-4 bg-white">
          <div className="flex-1">
            <input type="checkbox" className="mr-4" />
            <span className="">Sản phẩm</span>
          </div>
          <div className="flex flex-1 justify-between text-[#888888]">
            <div className="flex-1 text-center">Đơn giá</div>
            <div className="flex-1 text-center">Số lượng</div>
            <div className="flex-1 text-center">Số tiền</div>
            <div className="flex-1 text-end">Thao Tác</div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <CartDetail />
          <CartDetail />
        </div>
      </div>
    </div>
  );
}

export default CartPage;

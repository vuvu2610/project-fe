import Promotion from "../../assets/images/promotion.png";
import CartDetail from "./CartDetail";
import { CardInfo, GetCartReponseDto, GetUserInfoDto } from "../../types/types";
import { Emitter as emitter } from "../../eventEmitter/EventEmitter";
import { useEffect, useState } from "react";
import { callApi, getCart, getCartByUser, currentUser, payCart } from "../../api/axios";
function CartPage() {
  const [products, setProducts] = useState<GetCartReponseDto[]>([]);
  const [totalCard, setTotalCard] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isRerender, setIsRerender] = useState<boolean>(false);
  const [listCartPay, setListCartPay] = useState<CardInfo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCheckedNew = e.target.checked;
    console.log(isCheckedNew);
    setIsChecked(isCheckedNew);
    emitter.emit("checkAll", isCheckedNew);
  };

  useEffect(() => {
    console.log(currentUser);
    const fecth = async () => {
      currentUser ? setProducts(await callApi(() => getCartByUser(currentUser.id))) : setProducts([]);
    }
    fecth();
  }, [isRerender]);

  useEffect(() => {
    const handleChecked = (element: CardInfo) => {
      setTotalCard((prevQuantity) => prevQuantity + element.quantity);
      setTotalPrice((prevPrice) => prevPrice + element.price);
      setListCartPay((prev) => [...prev, element]);
    };

    const handleUnchecked = (element: CardInfo) => {
      setTotalCard((prevQuantity) => prevQuantity - element.quantity);
      setTotalPrice((prevPrice) => prevPrice - element.price);
      setListCartPay((prev) => prev.filter((item) => item.id !== element.id));
      setIsChecked(false);
    };

    const handleDeletedCard = () => {
      setIsRerender(prev => !prev);
    }

    emitter.on("elementChecked", handleChecked);
    emitter.on("elementUnchecked", handleUnchecked);
    emitter.on("deletedCard", handleDeletedCard);

    return () => {
      emitter.off("elementChecked", handleChecked);
      emitter.off("elementUnchecked", handleUnchecked);
      emitter.off("deletedCard", handleDeletedCard);
    };
  }, [products]);

  const handleBuyProduct = async () => {
    if (products.length === 0) return;
    const fecth = async () => {
      await callApi(() => payCart(listCartPay));
      setIsRerender(prev => !prev);
      setTotalCard(0);
      setTotalPrice(0);
      setIsChecked(false);

    }
    fecth();
  }
  
  return (
    <div className="pb-[160px] bg-[#f5f5f5]">
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
        <div className="flex flex-col gap-1 mb-4">
          {
            products.map((product, index) => {
              return <CartDetail getCardReponseDto={product} key={index}/>;
            })
          }
        </div>
        <div className="flex justify-between items-center px-8 py-4 mb-4 bg-white">
          <div className="flex-1">
            <input
              type="checkbox"
              className="mr-4"
              onChange={handleChange}
              checked={isChecked}
            />
            <span className="">Chọn tất cả</span>
          </div>
          <div className="flex flex-1 justify-between text-[#888888] items-center">
            <div className="text-center">
              Tổng thanh toán ({totalCard} Sản phẩm):{" "}
              <span className="text-[#EE4D2D]">đ{totalPrice}</span>
            </div>
            <button className={`bg-[#EE4D2D] text-white px-10 py-2  ${products.length !== 0 ? "hover:opacity-80":"select-none opacity-30 cursor-not-allowed"}`} onClick = {handleBuyProduct}>
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

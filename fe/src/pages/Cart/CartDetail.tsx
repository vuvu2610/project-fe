import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { callApi, deleteCart } from '../../api/axios';
import ActiveQuantity from "../../components/ActiveQuantity";
import routes from "../../config/routes";
import { Emitter as emitter } from "../../eventEmitter/EventEmitter";
import { GetCartReponseDto } from "../../types/types";

interface CartDetailProps {
  getCardReponseDto: GetCartReponseDto;
  isChecked?: boolean;
}

const CartDetail = (props: CartDetailProps) => {
  const [quantity, setQuantity] = useState<number>(props.getCardReponseDto.quantity);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();


  const prevCheckedRef = useRef(checked);
  const prevQuantityRef = useRef(quantity);

  const checkElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEvent = (isCheckAll: boolean) => {
      setChecked(isCheckAll);
    };

    emitter.on("checkAll", handleEvent);

    return () => {
      emitter.off("checkAll", handleEvent);
    };
  }, []);

  useEffect(() => {
    const prevChecked = prevCheckedRef.current;
    const prevQuantity = prevQuantityRef.current;

    if (checked !== prevChecked) {
      // Checked state changed
      const event = checked ? "elementChecked" : "elementUnchecked";
      emitter.emit(event, {
        price: props.getCardReponseDto.price * quantity,
        quantity,
        id: props.getCardReponseDto.cartId,
        productId: props.getCardReponseDto.productId
      });
    } else if (quantity !== prevQuantity) {
      if (checked) {
        emitter.emit("elementChecked", {
          price: (quantity - prevQuantity) * props.getCardReponseDto.price,
          quantity: quantity - prevQuantity,
          id: props.getCardReponseDto.cartId,
          productId: props.getCardReponseDto.productId
        });
      }
    }

    prevCheckedRef.current = checked;
    prevQuantityRef.current = quantity;
  }, [checked, quantity]);

  const toggleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleDelete = () => {
    const deleteProduct = async () => {
      try {
        await callApi(() => deleteCart([props.getCardReponseDto.cartId]));
        emitter.emit("deletedCard")
      } catch (error) {
        console.error('Failed to delete product');
      }
    };
    deleteProduct();
  }

  const handleClickImg = () => {
    navigate(`${routes.product}/${props.getCardReponseDto.productId}`);
  }

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white gap-6 border-y">
      <div className="flex-1 flex">
        <input
          type="checkbox"
          className="mr-4"
          ref={checkElement}
          onChange={toggleCheck}
          checked={checked}
        />
        <div className="flex gap-4">
          <img src={props.getCardReponseDto.productImage} alt="" className="w-20 h-20" onClick={handleClickImg}/>
          <div className="flex flex-col justify-around">
            <p className="break-all max-h-8 text-ellipsis text-sm leading-4 overflow-hidden line-clamp-2">
              {props.getCardReponseDto.productName}
            </p>
            <p className="text-sm font-semibold">Số lượng hàng còn lại: <span className="text-[#003b31]">{props.getCardReponseDto.remainingQuantity}</span></p>
            <p className="border border-[#EE4D2D] px-1 w-44 text-[#EE4D2D] text-sm">
              Đổi trả miễn phí 15 ngày
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-between items-center text-[#888888]">
        <div className="flex-1 text-center">đ{props.getCardReponseDto.price}</div>
        <ActiveQuantity onQuantityChange={handleQuantityChange} quantity={quantity}></ActiveQuantity>
        <div className="text-primary flex-1 text-center">
          đ{props.getCardReponseDto.price * quantity}
        </div>
        <button className="flex-1" onClick={handleDelete}><MdDelete size={30} color="red" className="ml-auto" /></button>
      </div>
    </div>
  );
};

export default CartDetail;

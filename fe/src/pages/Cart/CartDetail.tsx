import { useEffect, useRef, useState } from "react";
import { GetCartReponseDto, Product } from "../../types/types";
import products from "../../api/product.json";
import { Emitter as emitter } from "../../eventEmitter/EventEmitter";
import {callApi, getCartByUser, currentUser, deleteCart} from '../../api/axios'

interface CartDetailProps {
  getCardReponseDto: GetCartReponseDto;
  isChecked?: boolean;
}

const CartDetail = (props: CartDetailProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [checked, setChecked] = useState<boolean>(false);


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
        console.log("quantity changed" , quantity - prevQuantity);
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

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(() => {
      const newQuantity = Number(e.target.value);
      // if (checked) {
      //     emitter.emit("elementChecked", {
      //         price: (newQuantity - quantity) * product.price,
      //         quantity: newQuantity - quantity,
      //       });
      // }
      return newQuantity;
    });
  };

  const adjustQuantity = (adjustment: number) => {  
    setQuantity((prevQuantity) => Math.max(prevQuantity + adjustment, 1));  
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
          <img src={props.getCardReponseDto.productImage} alt="" className="w-20 h-20" />
          <div className="flex flex-col justify-around">
            <p className="break-all max-h-8 text-ellipsis text-sm leading-4 overflow-hidden line-clamp-2">
              {props.getCardReponseDto.productName}
            </p>
            <p className="border border-[#EE4D2D] px-1 w-44 text-[#EE4D2D] text-sm">
              Đổi trả miễn phí 15 ngày
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-between items-center text-[#888888]">
        <div className="flex-1 text-center">đ{props.getCardReponseDto.price}</div>
        <div className="items-center flex flex-1">
          <button
            className="rounded-l-lg border h-8 w-8"
            onClick={() => adjustQuantity(-1)}
          >
            -
          </button>
          <input
            value={quantity}
            onChange={updateQuantity}
            type="text"
            className="h-8 w-12 text-center border border-l-0 border-r-0 text-black"
          />
          <button
            className="rounded-r-lg border h-8 w-8"
            onClick={() => adjustQuantity(1)}
          >
            +
          </button>
        </div>
        <div className="text-primary flex-1 text-center">
          đ{props.getCardReponseDto.price * quantity}
        </div>
        <button className="text-[#EE4D2D] flex-1 text-end" onClick={handleDelete}>Xoa</button>
      </div>
    </div>
  );
};

export default CartDetail;

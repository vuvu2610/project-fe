import React, { useEffect, useState, useRef } from 'react';
import { CardInfo } from "../../types/types";
import { isNum } from "react-toastify/dist/utils";
import { useSelector } from 'react-redux';
import Button from '../Button';

const CouponCard = () => {
    const [discount, setDiscount] = useState(0);
    const copyValueRef = useRef<HTMLInputElement>(null);
    const buttonCopyRef = useRef<HTMLButtonElement>(null);
    const listCartPay: CardInfo[] = useSelector((state: any) => state.app.listCartPay)

    useEffect(() => {
        const calculateDiscount = () => {
            listCartPay.forEach(item => {
                const amount = item.price * item.quantity;
                if (amount < 1000000) {
                    setDiscount(5);
                } else {
                    setDiscount(15);
                }
            })
        };
        calculateDiscount();
    }, []);

    const expiryDateCoupon = () => {
        const currentDate = new Date();
        const purchaseDate = currentDate.getDate();
        const purchaseMonth = currentDate.getMonth();
        const purchaseYear = currentDate.getFullYear();
        return `${ purchaseDate + 5 } /${purchaseMonth}/${ purchaseYear }`;
    };

    const generateRandomValue = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    };

    const copyIt = () => {
        if (copyValueRef.current) {
            copyValueRef.current.select();
            navigator.clipboard.writeText(copyValueRef.current.value)
                .then(() => {
                    if (buttonCopyRef.current) {
                        buttonCopyRef.current.innerText = 'Đã sao chép';
                        setTimeout(() => {
                            if (buttonCopyRef.current) {
                                buttonCopyRef.current.innerText = 'Sao chép';
                            }
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                });
        }
    };

    return (
        <div className="flex items-center justify-center border rounded-lg">
            <div className="relative w-[600px] bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/seedling-39ef5.appspot.com/o/Logo%2FLogo_Seedling-removebg-preview.png?alt=media&token=80d714c7-23ee-482e-855f-112796f1fd48"
                            alt=""
                            className="w-40 h-40 ml-[-8px]"
                        />
                    </div>
                    <div className="ml-6">
                        <h2 className="text-lg text-gray-600 uppercase">PHIẾU GIẢM GIÁ</h2>
                        <h1 className="text-4xl text-red-600">
                            {discount + "%"} <span className="text-lg">cho hoá đơn tiếp theo</span>
                        </h1>
                        <p className="text-gray-500">Ngày hết hạn {expiryDateCoupon()}</p>
                        <div className="flex justify-between items-center mt-4 border rounded px-2 py-1">
                            <input
                            ref={copyValueRef}
                                id="copyvalue"
                                type="text"
                                readOnly
                                value={generateRandomValue()}
                                className=" h-full border-none outline-none text-sm"
                            />
                            <Button className="px-5 py-1 text-white rounded flex-1 w-40" onClick={copyIt} ref={buttonCopyRef}>
                                Sao chép
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CouponCard;
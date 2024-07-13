import React, { useState } from 'react';

interface Props {
    quantity: number;
    className?: string;
    onQuantityChange: (newQuantity: number) => void; // Prop mới để truyền giá trị ra ngoài
}

function ActiveQuantity(props: Props) {
    const { quantity: initialQuantity, className, onQuantityChange } = props;
    const [quantity, setQuantity] = useState(initialQuantity);


    const adjustQuantity = (adjustment: number) => {  
        const newQuantity = Math.max(quantity + adjustment, 1);
        setQuantity(newQuantity);  
        onQuantityChange(newQuantity);
    };  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10) || 0;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    return (
        <div className={`items-center flex ${className}`}>
          <button
            className="rounded-l-lg border h-8 w-8"
            onClick={() => adjustQuantity(-1)}
          >
            -
          </button>
          <input
            value={quantity}
            onChange={handleChange}
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
    );
}

export default ActiveQuantity;
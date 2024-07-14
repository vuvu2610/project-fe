import React, { forwardRef } from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return (
        <button
            onClick={props.onClick}
            ref={ref}
            className={`px-4 py-3 bg-[#008854] text-white rounded-xl block hover:bg-[#008854de] transition-all duration-300  ${props.className}`}
        >
            {props.children}
        </button>
    );
});

export default Button;
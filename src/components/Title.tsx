import React, { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
    return <p className={`font-bold ${className}`}>{children}</p>;
};

export default Title;
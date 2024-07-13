interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={`px-4 py-3 bg-[#008854] text-white rounded-xl block hover:bg-[#008854de] transition-all duration-300  ${props.className}`}
        >
            {props.children}
        </button>
    );
}

export default Button;
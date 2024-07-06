import { FaCcVisa, FaCcMastercard, FaCcPaypal  } from "react-icons/fa";

interface Props {}

function Footer(props: Props) {
    const {} = props

    return (
        <div className="bg-footer w-full flex justify-between px-[10%] py-10 text-white flex-col gap-4 md:flex-row">
            <div className="max-w-56">
                <div className="text-2xl font-semibold">Why People Like us!</div>
                <div className="text-[#a2aaa6]">typesetting, remaining essentially unchanged. It was popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</div>
            </div>
            <div className="">
                <div className="text-2xl font-semibold">Shop Info</div>
                <div className="text-[#a2aaa6]">About Us</div>
                <div className="text-[#a2aaa6]">Contact Us</div>
                <div className="text-[#a2aaa6]">Privacy Policy</div>
                <div className="text-[#a2aaa6]">Term and Condition</div>
            </div>
            <div className="">
                <div className="text-2xl font-semibold">Account</div>
                <div className="text-[#a2aaa6]">Shop Details</div>
                <div className="text-[#a2aaa6]">Shopping Cart</div>
            </div>
            <div className="">
                <div className="text-2xl font-semibold">Contact </div>
                <div className="text-[#a2aaa6]">Address</div>
                <div className="text-[#a2aaa6]">Email: matcha@company.net</div>
                <div className="text-[#a2aaa6]">Phone: +84329028367</div>
                <div className="text-[#a2aaa6]">Payment Accepted</div>
                <div className="flex gap-4" >
                    <FaCcVisa size={35}/>
                    <FaCcMastercard size={35}/>
                    <FaCcPaypal size={35}/>
                </div>
            </div>
        </div>
    )
}

export default Footer

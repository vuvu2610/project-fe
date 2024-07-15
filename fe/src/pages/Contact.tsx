import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

interface FormValues {
    fullName: string;
    street: string;
    phoneNo: string;
    email: string;
    message: string;
}

interface Errors {
    [key: string]: string;
}

function Contact() {
    const [formValues, setFormValues] = useState<FormValues>({
        fullName: '',
        street: '',
        phoneNo: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = (): boolean => {
        let tempErrors: Errors = {};
        tempErrors.fullName = formValues.fullName ? '' : 'Full Name is required.';
        tempErrors.street = formValues.street ? '' : 'Street is required.';
        tempErrors.phoneNo = formValues.phoneNo ? '' : 'Phone No. is required.';
        tempErrors.email = formValues.email ? '' : 'Email is required.';
        tempErrors.message = formValues.message ? '' : 'Message is required.';

        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setFormValues({
                fullName: '',
                street: '',
                phoneNo: '',
                email: '',
                message: '',
            });
            toast.success('Send Message successfully!');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="wrapper">
            <div className="mb-[140px] grid md:grid-cols-2 gap-16 items-center relative overflow-hidden p-10 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-white text-black before:absolute before:right-0 before:w-[300px] before:bg-blue-400 before:h-full max-md:before:hidden">
                <div>
                    <h2 className="text-3xl font-semibold">Liên hệ với chúng tôi</h2>
                    <p className="text-sm text-gray-400 mt-3">
                    Bạn có câu hỏi cụ thể hoặc muốn khám phá những cơ hội mới? Đội ngũ giàu kinh nghiệm của chúng tôi sẵn sàng hợp tác với bạn.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 mt-8">
                            <input
                                type="text"
                                name="fullName"
                                value={formValues.fullName}
                                onChange={handleChange}
                                placeholder="Họ và tên"
                                className={`px-2 py-3 bg-white w-full text-sm border-b-2 ${
                                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                                } focus:border-[#333] outline-none`}
                            />
                            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}

                            <input
                                type="text"
                                name="street"
                                value={formValues.street}
                                onChange={handleChange}
                                placeholder="Địa chỉ"
                                className={`px-2 py-3 bg-white w-full text-sm border-b-2 ${
                                    errors.street ? 'border-red-500' : 'border-gray-300'
                                } focus:border-[#333] outline-none`}
                            />
                            {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>}

                            <input
                                type="number"
                                name="phoneNo"
                                value={formValues.phoneNo}
                                onChange={handleChange}
                                placeholder="Số điện thoại"
                                className={`px-2 py-3 bg-white text-black w-full text-sm border-b-2 ${
                                    errors.phoneNo ? 'border-red-500' : 'border-gray-300'
                                } focus:border-[#333] outline-none`}
                            />
                            {errors.phoneNo && <p className="text-red-500 text-xs">{errors.phoneNo}</p>}

                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className={`px-2 py-3 bg-white text-black w-full text-sm border-b-2 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } focus:border-[#333] outline-none`}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                            <textarea
                                name="message"
                                value={formValues.message}
                                onChange={handleChange}
                                placeholder="Nội dung tin nhắn"
                                className={`px-2 pt-3 bg-white text-black w-full text-sm border-b-2 ${
                                    errors.message ? 'border-red-500' : 'border-gray-300'
                                } focus:border-[#333] outline-none`}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="mt-8 flex items-center justify-center text-sm w-full rounded px-4 py-2.5 font-semibold bg-[#333] text-white hover:bg-[#222]"
                        >
                            Gửi
                        </button>
                    </form>
                    <ul className="mt-4 flex justify-center lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2 ">
                        <li className="flex items-center hover:text-blue-500">
                            <MdOutlineEmail className="w-6 h-6 text-gray-500" />
                            <a href="mailto:dinhphong.work@gmail.com" className="text-current text-sm ml-3">
                                <strong>seedling.work@gmail.com</strong>
                            </a>
                        </li>
                        <li className="flex items-center text-current hover:text-blue-500">
                            <FaPhone className="w-4 h-4 text-gray-500" />
                            <a href="tel:0981972202" className="text-current text-sm ml-3">
                                <strong>0329028367</strong>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="z-10 relative h-full max-md:min-h-[350px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497200.08241769293!2d108.73550173146545!3d13.201716672098744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f70bf634caeff%3A0xfe6ebe1c1c171a80!2zUGjDuiBZw6puLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1717913577632!5m2!1svi!2s"
                        className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                        allowFullScreen
                    ></iframe>
                
                </div>
            </div>
        </div>
    );
}

export default Contact;
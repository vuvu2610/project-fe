import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

function FooterContent() {
    return (
        <div className="py-[50px] mt-0 border-b border-gray-300 flex lg:flex-row flex-col lg:gap-[110px] gap-6">
            <div className="w-[248px]">
                <h2 className="font-[IntegralCf] text-[24px]">SEEDLING</h2>
                <p className="my-[30px]">
                    Là nơi bạn có thể tìm thấy những cây giống tốt nhất cho ngôi nhà của mình. Chúng tôi cung cấp những sản phẩm chất lượng nhất từ những nguồn cung cấp uy tín nhất.
                </p>
                <div className="flex gap-3">
                    <FaTwitter className="w-6 h-6" />
                    <FaFacebook className="w-6 h-6" />
                    <FaLinkedin className="w-6 h-6" />
                    <FaGithub className="w-6 h-6" />
                </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-4 grid-cols-2 text-left gap-6">
                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase ">Công ty</h2>
                    <p>Về chúng tôi</p>
                    <p>Features</p>
                    <p>Tính năng</p>
                    <p>Nghề nghiệp</p>
                </div>

                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase ">Hỗ trợ</h2>
                    <p>Hỗ trợ khách hàng</p>
                    <p>Chi tiết giao hàng</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Chính sách</p>
                </div>

                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase ">Hỏi và trả lời</h2>
                    <p>Tài khoản</p>
                    <p>Quản lý việc giao hàng</p>
                    <p>Đặt hàng</p>
                    <p>Thanh toán</p>
                </div>

                <div className="space-y-4">
                    <h2 className="tracking-widest uppercase ">Nhân lực</h2>
                    <p>Hướng dẫn</p>
                    <p>Blog</p>
                    <p>Youtube</p>
                </div>
            </div>
        </div>
    );
}

export default FooterContent;

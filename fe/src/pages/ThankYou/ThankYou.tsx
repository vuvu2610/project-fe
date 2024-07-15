import React from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import { CardInfo, GetCartReponseDto, GetUserInfoDto } from "../../types/types";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import logoImg from "../../assets/images/logo.jpg";
import CouponCard from "../../components/CouponCard/CouponCard";
import Button from "../../components/Button";
import { FaPrint } from "react-icons/fa";
import { robotoBase64 as poppinsFont} from "../../utils/constance";

function ThankYou() {
  const listCartPay: CardInfo[] = useSelector(
    (state: any) => state.app.listCartPay
  );
  const user: GetUserInfoDto = useSelector(
    (state: any) => state.auth.currentUser
  );
  const printPDF = async () => {
    try {
      const pdfBlob = await generatePDFBlob(listCartPay);

      if (pdfBlob) {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      }
    } catch (error) {
      console.error("Error printing PDF:", error);
    }
  };

  const generatePDFBlob = (products: CardInfo[]): Blob => {
    const doc = new jsPDF();
    doc.addFileToVFS('Poppins.ttf', poppinsFont);  
    doc.addFont('Poppins.ttf', 'Poppins', 'normal');  
    doc.setFont('Poppins');
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const logoWidth = 30; // Adjust as needed
    const logoHeight = 10; // Adjust as needed
    const x = 10; // X position of the logo
    const y = 10; // Y position of the logo
    doc.addImage(logoImg, "PNG", x, y, logoWidth, logoHeight);
    // Add title
    doc.setFontSize(18);
    doc.text("HOA DON MUA HANG", 105, 20, { align: "center" });

    // Add company details
    doc.setFontSize(12);
    doc.text("SEEDLING MARKET", 10, 30);
    doc.text("Hotline: (+84) 999-439611", 10, 35);
    doc.text("Email: seedlingmarket@company.com", 10, 40);

    // Add customer details
    doc.text(`KH: ${user.name}`, 150, 30);
    doc.text(`Ngay mua hang: ${formattedDate}`, 150, 35);

    // Add table content using autoTable
    const tableColumn = ['Ma san pham', 'Ten san pham', 'So luong', 'Gia tien', 'Tong cong'];
    const tableRows: any[] = [];

    let startY = 70; // Y position to start the table
    let totalAmount = 0;

    products.forEach((product) => {
      const total = product.quantity * product.price;
      totalAmount += total;

      const productData = [
        product.productId.toString(),
        product.name,
        product.quantity.toString(),
        product.price.toFixed(2),
        total.toFixed(2),
      ];
      tableRows.push(productData);
    });

    // Use autoTable function from jspdf-autotable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: startY,
      didDrawPage: (data: { doc: jsPDF; pageNumber: number }) => {
        startY = data.doc.internal.pageSize.height - 10; // Update startY after table is drawn
      },
    });

    // Add total amount
    doc.setFontSize(14);
    doc.text("Tong tien:", 130, startY);
    doc.text(totalAmount.toFixed(2), 155, startY);
    doc.text("VND", 168, startY);

    return doc.output("blob");
  };

  return (
    <div className="w-full max-w-[1024px] md:mx-auto  py-20 gap-y-3 mt-6 mb-40 flex gap-4 justify-between items-center relative">
      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-4xl">Đặt hàng thành công 🎉</h1>

        <p>
          Bạn đã nhận được phiếu giảm giá
          <br /> cho đơn hàng tiếp theo
        </p>

        <Link
          to={routes.product}
          className="rounded-xl bg-rgb(0, 136, 84)-300 font-semibold transition-all duration-300 ease-in-out text-black p-4 w-content underline"
        >
          Quay về Trang chủ ➡
        </Link>
      </div>
      <div className="flex-1">
        <CouponCard />
        <Button onClick={printPDF} className="mt-4 absolute top-0 right-0">
          <FaPrint size={20} />
        </Button>
      </div>
    </div>
  );
}

export default ThankYou;

import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../config/routes'
import { CardInfo, GetCartReponseDto, GetUserInfoDto } from "../../types/types";
import { BsCartCheckFill } from 'react-icons/bs'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { useSelector } from 'react-redux';
import logoImg from '../../assets/images/logo.jpg';

function ThankYou() {
    const listCartPay: CardInfo[] = useSelector((state: any) => state.app.listCartPay)
    console.log(listCartPay)
    const printPDF = async () => {
        try {
          const pdfBlob = await generatePDFBlob(listCartPay);
          
          if (pdfBlob) {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
          }
        } catch (error) {
          console.error('Error printing PDF:', error);
        }
      };
    
    
      const generatePDFBlob = (products: CardInfo[]): Blob => {
        const doc = new jsPDF();
        const logoWidth = 30; // Adjust as needed
        const logoHeight = 10; // Adjust as needed
        const x = 10; // X position of the logo
        const y = 10; // Y position of the logo
        doc.addImage(logoImg, 'PNG', x, y, logoWidth, logoHeight);
        // Add title
        doc.setFontSize(18);
        doc.text('HÓA ĐƠN MUA HÀNG', 105, 20, { align: 'center' });
    
        // Add company details
        doc.setFontSize(12);
        doc.text('SEEDLING MARKET', 10, 30);
        doc.text('Address Line 1', 10, 35);
        doc.text('Address Line 2', 10, 40);
        doc.text('Hotline: (+84) 999-439611', 10, 45);
        doc.text('Email: seedlingmarket@company.com', 10, 50);
    
        // Add customer details
        doc.text('KH:', 150, 30);
        doc.text('Customer Address Line 1', 150, 35);
        doc.text('Customer Address Line 2', 150, 40);
        doc.text('Customer Phone: (098) 765-4321', 150, 45);
        doc.text('Customer Email: customer@example.com', 150, 50);
    
        // Add table content using autoTable
        const tableColumn = ['Mã sản phẩm', 'Tên sản phẩm', 'Số lượng', 'Giá tiền', 'Tổng cộng'];
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
            didDrawPage: (data: { doc: jsPDF; pageNumber: number; }) => {
                startY = data.doc.internal.pageSize.height - 10; // Update startY after table is drawn
            }
        });
    
        // Add total amount
        doc.setFontSize(14);
        doc.text('Total Amount:', 130, startY); // Use updated startY here
        doc.text(totalAmount.toFixed(2), 170, startY); // Use updated startY here
    
        return doc.output('blob');
    };

    return (
        <div className='w-full max-w-[768px] md:mx-auto  py-10 gap-y-3  shadow-custom mt-6 mb-40 flex justify-center items-center flex-col h-screen'>
            
            <BsCartCheckFill size={56} className='text-primary' />
            <h1 className='text-4xl'>Thank you !</h1>
            <p>You order was successfuly completed.</p>

        <Link to={routes.product} className='rounded-xl bg-gray-300 hover:bg-primary transition-all duration-300 ease-in-out text-black hover:text-white p-4'>
        Continue shopping
        </Link>
        <button onClick={printPDF}>IN</button>

        </div>
    )
}

export default ThankYou

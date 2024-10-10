import React, { useRef } from "react";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import { useLoaderData } from "react-router-dom";

const Preview = () => {
  const {
    name,
    billName,
    billNumber,
    dateStart,
    street,
    items,
    city,
    number,
    billStreet,
    billPhone,
    grandTotal,
  } = useLoaderData();
  const data = useLoaderData();
  console.log(data);

  const invoiceRef = useRef();

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Download as PDF functionality
  const handleDownloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); // Create a PDF document in A4 size
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the height of the image to maintain aspect ratio

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if content overflows
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("invoice.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

  return (
    <div>
      <div
        ref={invoiceRef}
        className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-10"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">WEBPRO AI</h2>
          </div>
          <div className="text-right">
            <img
              className="w-[150px] cursor-pointer"
              src="https://webproais.com/wp-content/uploads/2024/05/Logo-1.png"
              alt=""
            />
            <h3 className="text-sm font-bold text-blue-600">info@webproais.com</h3>
            <h3 className="text-sm font-bold text-blue-600">webproais.com</h3>
          </div>
        </div>
        <div className="mt-4">
          <p>
            Invoice Number: <span className="font-bold">{billNumber}</span>
          </p>
          <p>
            Date: <span className="font-bold">{dateStart}</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-bold">Bill from:</h4>
            <p>{name}</p>
            <p>{street}</p>
            <p>{number}</p>
          </div>
          <div>
            <h4 className="font-bold">Bill to:</h4>
            <p>{billName}</p>
            <p>{billStreet}</p>
            <p>{billPhone}</p>
          </div>
        </div>

        <table className="w-full mt-6 table-auto">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2">Item</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Rate</th>
              <th className="text-left py-2">Tax</th>
              <th className="text-left py-2">Total</th>
            </tr>
          </thead>
          {items &&
            items?.map((item, idx) => (
              <tbody key={idx}>
                <tr className="border-b border-gray-200">
                  <td className="py-2">{item?.title}</td>
                  <td className="py-2">{item?.qty}</td>
                  <td className="py-2">${item?.rate}</td>
                  <td className="py-2">$0.00</td>
                  <td className="py-2">${item?.qty * item?.rate}</td>
                </tr>
              </tbody>
            ))}
        </table>

        <div className="mt-6">
          <h4 className="font-bold">Terms & Conditions:</h4>
          <p className="text-gray-500">
            Please make the payment within 15 days.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div></div>
          <div>
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className="font-bold">${grandTotal}</p>
            </div>
            {/* <div className="flex justify-between">
              <p>Discount:</p>
              <p className="font-bold">$0.00</p>
            </div>
            <div className="flex justify-between">
              <p>Tax:</p>
              <p className="font-bold">$0.00</p>
            </div> */}
            <div className="flex justify-between">
              <p>Paid:</p>
              <p className="font-bold">$0.00</p>
            </div>
            <div className="flex justify-between mt-4">
              <h3 className="text-2xl font-bold">Total Amount:</h3>
              <h3 className="text-2xl font-bold text-blue-600">
                ${grandTotal}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Preview;

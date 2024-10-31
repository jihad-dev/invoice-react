

import React, { useRef, useMemo } from "react";
import logopro from "../../assets/logopro-removebg-preview.png";
import sidelogopro from "../../assets/sidelogo-removebg-preview.png";
import { useLoaderData } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import stamp_image from "../../assets/stamp.png";
import NumberToWords from "number-to-words";

const ProformaView = () => {
  const { items, name, billNumber, dateStart, street1, street2 } =
    useLoaderData();
  const invoiceRef = useRef();

  const handlePrint = () => window.print();

  const generatePdf = async () => {
    const input = invoiceRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const marginLeft = (pageWidth - imgWidth) / 2;

    pdf.addImage(imgData, "PNG", marginLeft, 5, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  };

  const total = useMemo(() => {
    const subTotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);
    return (subTotal * 0.5).toFixed(2);
  }, [items]);
  // Convert the grand total to words dynamically
  const grandTotalInWords = NumberToWords.toWords(total);
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white border border-gray-300 rounded-xl shadow-xl my-8">
      <div ref={invoiceRef} id="pdf-content">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-300 pb-4 space-y-4 md:space-y-0">
          <img src={logopro} alt="Company Logo" className="w-auto md:h-28" />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-lg md:text-3xl font-bold text-green-700">
              <span className="text-red-600">SPD</span> Technical Works LLC
            </h1>
            <p className="text-xs md:text-sm text-gray-600">
              SABHA BUILDING, JABEL ALI INDUSTRIAL AREA FIRST
              <br />
              OFFICE # 03, P.O.Box: 112037, DUBAI, UAE
              <br />
              Mobile: +971 50 889 4701 | E-mail: info@spd-technical.com
              <br />
              Website:{" "}
              <a
                href="https://spd-technical.com"
                className="text-blue-500 underline"
              >
                spd-technical.com
              </a>
            </p>
          </div>
          <img src={sidelogopro} alt="Side Logo" className="w-auto" loading="lazy"/>
        </header>

        {/* Invoice Details */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-blue-700">BILL TO</h2>
            <p className=" text-gray-600 mt-1">
              {name}
              <br />
              {street1}
              <br />
              {street2}
              <br />
              <span className="text-semibold text-red-500">
                50% cash advance as per agreed terms
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-700">
              PROFORMA INVOICE
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              TRN: 100547065100003
              <br />
              {billNumber}
              <br />
              {dateStart}
            </p>
          </div>
        </section>

        {/* Table Section */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-xs border border-gray-300">
            <thead>
              <tr className="bg-blue-800 text-white text-left">
                <th className="border border-gray-300 px-2 md:px-4 py-2">
                  DESCRIPTION OF WORK
                </th>
                <th className="border w-[80px] md:w-[100px] border-gray-300 px-2 md:px-4 py-2">
                  QTY
                </th>
                <th className="border w-[80px] md:w-[100px] border-gray-300 px-2 md:px-4 py-2">
                  UNIT PRICE
                </th>
                <th className="border w-[100px] md:w-[120px] border-gray-300 px-2 md:px-4 py-2">
                  AMOUNT
                </th>
                <th className="border w-[100px] md:w-[150px] border-gray-300 px-2 md:px-4 py-2">
                  50% SUBTOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border border-black">
                    {item?.description}
                  </td>
                  <td className="px-4 py-2 border border-black">{item?.qty}</td>
                  <td className="px-4 py-2 border border-black">
                    {item?.rate}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {(item?.qty * item?.rate).toFixed(2)}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-right border-black">
                    {(item.qty * item.rate * 0.5).toFixed(2)}
                  </td>
                </tr>
              ))}
              <>
                <tr>
                  <td
                    className="px-4 py-2 border border-black font-bold text-[16px]"
                    colSpan={4}
                  >
                    Total Amount
                  </td>
                  <td className="px-4 py-2 border font-bold border-black text-right text-[16px] ">
                    {total}
                  </td>
                </tr>
              </>
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div className="">
          <p className="text-xs md:text-[18px] font-bold">
            Amount in Words :
            <span className="font-normal ml-1 uppercase">
              {grandTotalInWords}
            </span>
          </p>
        </div>

        {/* Footer Section */}
        <footer className="text-center text-[16px] text-gray-600 mt-6 border-b border-gray-300 py-4">
          <p>If you have any questions about this invoice, please contact</p>
          <p className="mb-2">
            MD SAZEDUR RAHMAN, +971 50 889 4701, E-mail: info@spd-technical.com
          </p>
        </footer>

        {/* Signature Section */}
        <div className="flex flex-col md:flex-row justify-around items-center md:items-center mt-6 space-y-4 md:space-y-0">
          <div>
            <p className="text-red-500 font-semibold">
              This is not a Tax Invoice
            </p>
            <p className="mt-2">Thanks & Regards</p>
            <div className="mt-2 space-y-1">
              <p className="font-bold">
                Md. Sazedur Rahman
                <span className="font-normal">(Manager)</span>
              </p>
              <p>SPD Technical Works LLC</p>
              <p>+971-50-889 4701</p>
              <p>
                E-mail:{" "}
                <a
                  href="mailto:info@spd-technical.com"
                  className="text-blue-500 underline"
                >
                  info@spd-technical.com
                </a>
              </p>
              <p>
                <a
                  href="https://spd-technical.com/"
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://spd-technical.com/
                </a>
              </p>
              <p>Licence No - 819627</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start ">
            <img src={stamp_image} alt="Stamp" className="h-[208px]" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Print & PDF Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-blue-700"
        >
          Print
        </button>
        <button
          onClick={generatePdf}
          className="bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ProformaView;

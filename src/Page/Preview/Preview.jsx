import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { Link, useLoaderData } from "react-router-dom";
import logo from "../../assets/header-logo.png";
import NumberToWords from "number-to-words";

const Preview = () => {
  const {
    name,
    billNumber,
    dateStart,
    street1,
    items,
    street2,
    phone,
    subject,
    email,
    signature
  } = useLoaderData();

  const invoiceRef = useRef();

  // Calculate the subtotal
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);

  // Define the tax rate (5%)
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;

  // Calculate the grand total
  const grandTotal = subtotal + taxAmount;

  // Convert the grand total to words dynamically
  const grandTotalInWords = NumberToWords.toWords(grandTotal);

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  const generatePdf = async () => {
    const input = invoiceRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const canvas = await html2canvas(input, { scale: 2 });
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let yPosition = 0;
    const rowHeight = 25; // Approximate row height in pixels

    while (yPosition < canvas.height) {
      const remainingHeight = canvas.height - yPosition;
      const pageSliceHeight = Math.min(
        pageHeight * (canvas.width / pageWidth) - rowHeight, // Adjust to fit full rows
        remainingHeight
      );

      const adjustedCanvas = document.createElement("canvas");
      adjustedCanvas.width = canvas.width;
      adjustedCanvas.height = pageSliceHeight;
      const adjustedContext = adjustedCanvas.getContext("2d");
      adjustedContext.drawImage(
        canvas,
        0,
        yPosition,
        canvas.width,
        pageSliceHeight,
        0,
        0,
        adjustedCanvas.width,
        adjustedCanvas.height
      );

      const pageImgData = adjustedCanvas.toDataURL("image/png");
      if (yPosition > 0) pdf.addPage();
      pdf.addImage(pageImgData, "PNG", 0, 0, imgWidth, pageHeight);
      yPosition += pageSliceHeight;
    }
    pdf.save("invoice.pdf");
  };

  return (
    <div>
      <Link className="" to="/list">
        <button className="bg-blue-500 my-12 lg:my-10 ml-12 lg:ml-14 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 hover:bg-blue-600">
          Back
        </button>
      </Link>
      <div id="pdf-content">
        <div
          ref={invoiceRef}
          className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg "
        >
          <div>
            <div id="pdf-header">
              <img className="w-full cursor-pointer" src={logo} alt="logo" />
            </div>
            <center>
              <h2 className="underline text-3xl font-bold text-black">
                TAX-INVOICE
              </h2>
              <p className="p-1 text-black font-semibold">
                VAT(Value Added Tax) TRN: 100547065100003
              </p>
            </center>
          </div>
          <div className="mt-4">
            <p>
              Invoice Number: <span className="font-bold">{billNumber}</span>
            </p>
            <p>
              Date: <span className="font-bold">{dateStart}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif"> {name}</h2>
            <p>Address: {street1}</p>
            <p>{street2}</p>
            <p>Email: {email}</p>
            <p>Tel: {phone}</p>
          </div>
          <div className="mt-5 mb-3">
            <p>
              Tax invoice for <span className="font-bold">{subject}</span>
            </p>
          </div>

          <div className="max-w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-black text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-black">
                      Description of Work
                    </th>
                    <th className="py-2 border border-black">Qty & Unit</th>
                    <th className="py-2 border border-black">Rate</th>
                    <th className="py-2 border border-black">Amount (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border border-black">
                          {item?.description}
                        </td>
                        <td className="px-4 py-2 border border-black">
                          {item?.qty}
                        </td>
                        <td className="px-4 py-2 border border-black">
                          {item?.rate}
                        </td>
                        <td className="px-4 py-2 border border-black">
                          {(item?.qty * item?.rate).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  <>
                    <tr>
                      <td
                        className="px-4 py-2 border border-black font-bold"
                        colSpan={3}
                      >
                        Sub Total
                      </td>
                      <td className="px-4 py-2 border font-bold border-black">
                        {subtotal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-2 border border-black font-bold"
                        colSpan={3}
                      >
                        5% VAT
                      </td>
                      <td className="px-4 py-2 border font-bold border-black">
                        {taxAmount?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-2 border border-black font-bold"
                        colSpan={3}
                      >
                        Total Amount
                      </td>
                      <td className="px-4 py-2 border font-bold border-black">
                        {grandTotal?.toFixed(2)}
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-4 mb-4 font-bold">
              Total in words:
              <span className="uppercase">{grandTotalInWords} AED Only</span>
            </p>
            <div className="mt-1">
              Only bank transfers or cheques as payment methods available (No
              cash payment accepted)
              <p> Cheque should be sent to SPD TECHNICAL WORKS LLC</p>
              <p>
                Bank Transfer: Account Name: SPD TECHNICAL WORKS LLC, Account
                no:11353811820001,
              </p>
              <p> IBAN: AE270030011353811820001, Bank: ADCB, Dubai, UAE</p>
            </div>
            <p className="mt-3 font-semibold">Thanks & Regards</p>
            <div className="mt-7 mb-3">
              <p>SPD Technical Works LLC </p>
              <p>Md. Sazedur Rahman</p>
              <p>+971-50-889 4701</p>
              <p>E mail: info@spd-technical.com</p>
            </div>
          </div>
          <footer className="px-4 py-0.5 border border-black border-r-0 border-l-0">
            <p>
              Mob: +971 50 889 4701+971 55 479 7551, Jabel Ali lndustrial First,
              P.O.Box: 112037, Dubai - U.A.E
            </p>
            <p className="text-center">
              E-mail: info@spd-technical.com,
              <a target="_blank" href="https://www.spd-technical.com/">
                https://www.spd-technical.com/
              </a>
            </p>
            <img src={signature} alt="" />
          </footer>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4 mb-5">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>
        <button
          onClick={generatePdf}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Preview;

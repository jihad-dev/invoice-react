
import React, { useRef, useState } from "react";
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
    street2,
    phone,
    subject,
    email,
    items = [],
  } = useLoaderData();

  const invoiceRef = useRef();

  // Calculate subtotal, tax, and grand total
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;
  const grandTotalInWords = NumberToWords.toWords(grandTotal);

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Generate PDF
  const generatePdf = async () => {
    const input = invoiceRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 200;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.height;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft - imgHeight + 10; // Add padding for the new page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("invoice.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/list" className="text-blue-600 underline">
        Back
      </Link>
      <div
        ref={invoiceRef}
        className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-10"
      >
        {/* Invoice Header */}
        <div id="pdf-header" className="text-center mb-4">
          <img className="w-full cursor-pointer" src={logo} alt="logo" />
          <h2 className="underline text-3xl font-bold text-black">
            TAX-INVOICE
          </h2>
          <p className="text-black font-semibold">
            VAT(Value Added Tax) TRN: 100547065100003
          </p>
        </div>

        {/* Invoice Info */}
        <div className="mt-4 text-gray-700">
          <p>
            Invoice Number: <span className="font-bold">{billNumber}</span>
          </p>
          <p>
            Date: <span className="font-bold">{dateStart}</span>
          </p>
        </div>

        {/* Client Information */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p>Address: {street1}</p>
          <p>{street2}</p>
          <p>Email: {email}</p>
          <p>Tel: {phone}</p>
        </div>

        {/* Subject */}
        <div className="mt-5 mb-3">
          <p>
            Tax invoice for: <span className="font-bold">{subject}</span>
          </p>
        </div>

        {/* Items Table */}
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
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border border-black">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 border border-black">{item.qty}</td>
                  <td className="px-4 py-2 border border-black">
                    {item.rate}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {(item.qty * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
              {/* Totals */}
              <tr>
                <td colSpan={3} className="px-4 py-2 border border-black font-bold">
                  Sub Total
                </td>
                <td className="px-4 py-2 border border-black font-bold">
                  {subtotal.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-2 border border-black font-bold">
                  5% VAT
                </td>
                <td className="px-4 py-2 border border-black font-bold">
                  {taxAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-2 border border-black font-bold">
                  Total Amount
                </td>
                <td className="px-4 py-2 border border-black font-bold">
                  {grandTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Amount in Words */}
        <p className="text-sm mt-4 font-bold">
          Total in words:
          <span className="uppercase">{grandTotalInWords}</span>
        </p>

        {/* Payment Details */}
        <div className="mt-4 text-sm">
          <p>
            Only bank transfers or cheques as payment methods available (No cash payment accepted).
          </p>
          <p>Cheque should be sent to SPD TECHNICAL WORKS LLC</p>
          <p>
            Bank Transfer: Account Name: SPD TECHNICAL WORKS LLC, Account no: 11353811820001,
            IBAN: AE270030011353811820001, Bank: ADCB, Dubai, UAE
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-4 px-4 py-2 border-t border-black text-center text-sm">
          <p>
            Mob: +971 50 889 4701, +971 55 479 7551, Jabel Ali Industrial First, P.O.Box: 112037, Dubai - U.A.E
          </p>
          <p>
            E-mail: info@spd-technical.com,{" "}
            <a target="_blank" href="https://www.spd-technical.com/" className="text-blue-600 underline">
              www.spd-technical.com
            </a>
          </p>
        </footer>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
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

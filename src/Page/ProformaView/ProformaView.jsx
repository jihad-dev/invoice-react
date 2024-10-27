import React, { useRef } from "react";
import logopro from "../../assets/logopro-removebg-preview.png";
import sidelogopro from "../../assets/sidelogo-removebg-preview.png";
import { useLoaderData } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const ProformaView = () => {
  const { items, name, billNumber, dateStart, street1, street2 } =
    useLoaderData();
  const invoiceRef = useRef();

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Generate PDF and center content on the page
  const generatePdf = async () => {
    const input = invoiceRef.current;

    // Create a new jsPDF document in A4 format (210mm x 297mm)
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth(); // A4 width
    const pageHeight = pdf.internal.pageSize.getHeight(); // A4 height

    // Capture the HTML content at a higher scale for better quality
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Calculate image size to fit within A4 with a margin
    const imgWidth = pageWidth - 20; // Adjusted width with margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Center the content on the page
    const marginLeft = (pageWidth - imgWidth) / 2;
    const marginTop = (pageHeight - imgHeight) / 2;

    // Add image to the PDF and save it
    pdf.addImage(imgData, "PNG", marginLeft, marginTop, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white border border-black rounded-lg shadow-lg my-12">
      <div id="pdf-content">
        <div ref={invoiceRef}>
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-1/3 md:w-auto flex justify-center mb-4 md:mb-0">
              <img src={logopro} alt="Company Logo" className="h-16 md:h-20" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-2xl font-bold text-green-700">
                <span className="text-red-600">SPD</span> Technical Works LLC
              </h1>
              <p className="text-xs md:text-sm text-gray-700">
                SABHA BUILDING, JABEL ALI INDUSTRIAL AREA FIRST
                <br />
                OFFICE # 03, P.O.Box: 112037, DUBAI, UAE
                <br />
                Mobile: +971 50 889 4701 | E-mail: info@spd-technical.com
                <br />
                Website: https://spd-technical.com
              </p>
            </div>
            <div className="w-1/3 md:w-auto flex justify-center mb-4 md:mb-0">
              <img src={sidelogopro} alt="Side Logo" className="h-16 md:h-20" />
            </div>
          </header>

          {/* Invoice Details */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-black py-4">
            <div className="mb-4 md:mb-0">
              <h2 className="font-semibold text-blue-800 text-lg">BILL TO</h2>
              <p className="text-xs md:text-sm">
                {name}
                <br />
                {street1}
                <br />
                {street2}
                <br />
                50% cash advance as per agreed terms
              </p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold text-blue-800 text-xl">
                PROFORMA INVOICE
              </h2>
              <p className="text-xs md:text-sm">
                TRN: 100547065100003
                <br />
                {billNumber}
                <br />
                {dateStart}
              </p>
            </div>
          </section>

          {/* Table */}
          <div className="overflow-x-auto my-4 border border-black rounded-lg">
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-left">
                  <th className="border border-black px-2 py-2">
                    DESCRIPTION OF WORK
                  </th>
                  <th className="border w-[100px] border-black px-2 py-2">
                    QTY
                  </th>
                  <th className="border w-[100px] border-black px-2 py-2">
                    UNIT PRICE
                  </th>
                  <th className="border w-[120px] border-black px-2 py-2">
                    AMOUNT
                  </th>
                  <th className="border w-[150px] border-black px-2 py-2">
                    50% SUBTOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="border-b border-black">
                        <td className="border px-2 py-2">
                          {item?.description}
                        </td>
                        <td className="border px-2 py-2 text-center">
                          {item?.qty}
                        </td>
                        <td className="border px-2 py-2 text-right">
                          {item?.rate}
                        </td>
                        <td className="border px-2 py-2 text-right">
                          {item.qty * item.rate}
                        </td>
                        <td className="border px-2 py-2 text-right">
                          {(item.qty * item.rate * 0.5).toFixed(2)}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-black py-4">
            <div className="text-sm">
              <p className="font-semibold">
                Amount in words:{" "}
                <span className="font-normal">
                  AED One hundred eighty-seven thousand five hundred dirhams and
                  zero fills only
                </span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-xs text-gray-600 mt-6">
            <p>If you have any questions about this invoice, please contact</p>
            <p>
              MD SAZEDUR RAHMAN, +971 50 889 4701, E-mail:
              info@spd-technical.com
            </p>
          </footer>
          {/*  */}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-8 border border-gray-200 shadow-md max-w-2xl mx-auto space-y-4 md:space-y-0">
            <div>
              <p className="text-red-500 font-semibold">
                This is not a Tax Invoice
              </p>
              <p className="mt-2">Thanks & Regards</p>
              <div className="mt-2 space-y-1">
                <p className="font-bold">
                  Md. Sazedur Rahman{" "}
                  <span className="font-normal">(Manager)</span>
                </p>
                <p>SPD Technical Works LLC</p>
                <p>+971-50-889 4701</p>
                <p>
                  E mail:{" "}
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
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <img
                src="path_to_stamp_image.png" // Replace with the correct path to the stamp image
                alt="Company Stamp"
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>
        </div>
      </div>

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

export default ProformaView;

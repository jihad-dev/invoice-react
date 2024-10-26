import React from "react";
import logopro from '../../assets/logopro-removebg-preview.png'
import sidelogopro from '../../assets/sidelogo-removebg-preview.png'
const ProformaView = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 my-12">
      {/* Header */}
      <header className="flex justify-around mb-4">
        <div>
          <img src={logopro || 'logo'} alt="" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-green-700">
            <span className="text-red-600">SPD</span> Technical Works LLC
          </h1>
          <p className="text-sm text-gray-700">
            SABHA BUILDING, JABEL ALI INDUSTRIAL AREA FIRST
            <br />
            OFFICE # 03, P.O.Box: 112037, DUBAI, UAE
            <br />
            Mobile: +971 50 889 4701 | E-mail: info@spd-technical.com
            <br />
            Website: https://spd-technical.com
          </p>
        </div>
        <div>
          <img src={sidelogopro || 'nai'} alt="" />
        </div>
      </header>

      <section className="flex justify-between items-center border-t border-b border-gray-300 py-2">
        <div>
          <h2 className="font-semibold text-blue-800">BILL TO</h2>
          <p className="text-sm">
            ENOVA Facility Management Service LLC
            <br />
            P.O. Box - 22707, City Centre Deira Complex, Dubai, UAE
            <br />
            TRN No: 100532851100003
            <br />
            50% cash advance as per agreed terms
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-2xl text-blue-800">PROFORMA INVOICE</h2>
          <p className="text-sm">
            TRN: 100547065100003
            <br />
            Invoice #: INV-ETC-101243_24
            <br />
            Date: 9/10/2024
          </p>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-blue-900 text-white text-left">
              <th className="border border-gray-300 px-2 py-1">SL/NO</th>
              <th className="border border-gray-300 px-2 py-1">
                DESCRIPTION OF WORK
              </th>
              <th className="border border-gray-300 px-2 py-1">QTY</th>
              <th className="border border-gray-300 px-2 py-1">UNIT PRICE</th>
              <th className="border border-gray-300 px-2 py-1">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">
                SS/Civil/Fitout: Fit-out Works (DWC Roof sheet & Gutter
                refurbishment works at various locations)
                <br />
                Ref: LPO NO - AE01P00002753
              </td>
              <td className="border px-2 py-1">1.00</td>
              <td className="border px-2 py-1">375,000.00</td>
              <td className="border px-2 py-1">187,500.00</td>
            </tr>
            {/* Additional rows can be added here if needed */}
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="flex justify-between items-center border-t border-b border-gray-300 py-2">
        <div className="text-sm">
          <p className="font-semibold">
            Amount in words:{" "}
            <span className="font-normal">
              AED One hundred eighty-seven thousand five hundred dirhams and
              zero fills only
            </span>
          </p>
        </div>
        <div className="text-right text-sm">
          <p>SUB TOTAL: AED 187,500.00</p>
          <p>DISCOUNT: 0.00</p>
          <p>5% TAX: 0.00</p>
          <p className="font-semibold text-lg">
            TOTAL: <span className="font-bold">AED 187,500.00</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 mt-4">
        <p>If you have any questions about this invoice, please contact</p>
        <p>
          MD SAZEDUR RAHMAN, +971 50 889 4701, E-mail: info@spd-technical.com
        </p>
      </footer>
    </div>
  );
};

export default ProformaView;

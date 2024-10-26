



// import React from "react";
// import logopro from '../../assets/logopro-removebg-preview.png';
// import sidelogopro from '../../assets/sidelogo-removebg-preview.png';
// import { useLoaderData } from "react-router-dom";

// const ProformaView = () => {
//   const data = useLoaderData();



//   return (
//     <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white border border-black rounded-lg shadow-lg my-12">
//       {/* Header */}
//       <header className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <div className="w-1/3 md:w-auto flex justify-center mb-4 md:mb-0">
//           <img src={logopro || 'logo'} alt="Company Logo" className="h-16 md:h-20" />
//         </div>
//         <div className="text-center md:text-left">
//           <h1 className="text-lg md:text-2xl font-bold text-green-700">
//             <span className="text-red-600">SPD</span> Technical Works LLC
//           </h1>
//           <p className="text-xs md:text-sm text-gray-700">
//             SABHA BUILDING, JABEL ALI INDUSTRIAL AREA FIRST
//             <br />
//             OFFICE # 03, P.O.Box: 112037, DUBAI, UAE
//             <br />
//             Mobile: +971 50 889 4701 | E-mail: info@spd-technical.com
//             <br />
//             Website: https://spd-technical.com
//           </p>
//         </div>
//         <div className="w-1/3 md:w-auto flex justify-center mb-4 md:mb-0">
//           <img src={sidelogopro || 'nai'} alt="Side Logo" className="h-16 md:h-20" />
//         </div>
//       </header>

//       {/* Invoice Details */}
//       <section className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-black py-4">
//         <div className="mb-4 md:mb-0">
//           <h2 className="font-semibold text-blue-800 text-lg">BILL TO</h2>
//           <p className="text-xs md:text-sm">
//             ENOVA Facility Management Service LLC
//             <br />
//             P.O. Box - 22707, City Centre Deira Complex, Dubai, UAE
//             <br />
//             TRN No: 100532851100003
//             <br />
//             50% cash advance as per agreed terms
//           </p>
//         </div>
//         <div className="text-right">
//           <h2 className="font-semibold text-blue-800 text-xl">PROFORMA INVOICE</h2>
//           <p className="text-xs md:text-sm">
//             TRN: 100547065100003
//             <br />
//             Invoice #: INV-ETC-101243_24
//             <br />
//             Date: 9/10/2024
//           </p>
//         </div>
//       </section>

//       {/* Table */}
//       <div className="overflow-x-auto my-4 border border-black rounded-lg">
//         <table className="w-full text-xs md:text-sm border-collapse">
//           <thead>
//             <tr className="bg-blue-900 text-white text-left">
//               <th className="border border-black px-2 py-2">DESCRIPTION OF WORK</th>
//               <th className="border w-[120px] border-black px-2 py-2">QTY</th>
//               <th className="border w-[120px] border-black px-2 py-2">UNIT PRICE</th>
//               <th className="border w-[120px] border-black px-2 py-2">AMOUNT</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((invoice) => (
//               <React.Fragment key={invoice._id}>
//                 {invoice.items.map((item, index) => (
//                   <tr key={index} className="border-b border-black">
//                     <td className="border px-2 py-2">{item?.description}</td>
//                     <td className="border px-2 py-2 text-center">{item.qty}</td>
//                     <td className="border px-2 py-2 text-right">{invoice?.subTotal}</td>
//                     <td className="border px-2 py-2 text-right"> 187,500.00</td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Total Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-black py-4">
//         <div className="text-sm">
//           <p className="font-semibold">
//             Amount in words:{" "}
//             <span className="font-normal">
//               AED One hundred eighty-seven thousand five hundred dirhams and zero fills only
//             </span>
//           </p>
//         </div>
//         <div className="text-right text-sm">
//           <p>SUB TOTAL: AED 187,500.00</p>
//           <p>DISCOUNT: 0.00</p>
//           <p>5% TAX: 0.00</p>
//           <p className="font-semibold text-lg">
//             TOTAL: <span className="font-bold">AED 187,500.00</span>
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="text-center text-xs text-gray-600 mt-6">
//         <p>If you have any questions about this invoice, please contact</p>
//         <p>MD SAZEDUR RAHMAN, +971 50 889 4701, E-mail: info@spd-technical.com</p>
//       </footer>
//     </div>
//   );
// };

// export default ProformaView;




import React from "react";
import logopro from '../../assets/logopro-removebg-preview.png';
import sidelogopro from '../../assets/sidelogo-removebg-preview.png';
import { useLoaderData } from "react-router-dom";

const ProformaView = () => {
  const data = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white border border-black rounded-lg shadow-lg my-12">
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
            ENOVA Facility Management Service LLC
            <br />
            P.O. Box - 22707, City Centre Deira Complex, Dubai, UAE
            <br />
            TRN No: 100532851100003
            <br />
            50% cash advance as per agreed terms
          </p>
        </div>
        <div className="text-right">
          <h2 className="font-semibold text-blue-800 text-xl">PROFORMA INVOICE</h2>
          <p className="text-xs md:text-sm">
            TRN: 100547065100003
            <br />
            Invoice #: INV-ETC-101243_24
            <br />
            Date: 9/10/2024
          </p>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto my-4 border border-black rounded-lg">
        <table className="w-full text-xs md:text-sm border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white text-left">
              <th className="border border-black px-2 py-2">DESCRIPTION OF WORK</th>
              <th className="border w-[120px] border-black px-2 py-2">QTY</th>
              <th className="border w-[120px] border-black px-2 py-2">UNIT PRICE</th>
              <th className="border w-[120px] border-black px-2 py-2">AMOUNT</th>
              <th className="border w-[120px] border-black px-2 py-2">Total AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice) => {
              const totalAmount = invoice.items.reduce((acc, item) => {
                const itemTotal = item.qty * item.rate; // Calculate item total
                return acc + itemTotal; // Accumulate total amount
              }, 0);

              const subTotal = totalAmount * 0.5; // Calculate 50% of total amount

              return (
                <React.Fragment key={invoice._id}>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-black">
                      <td className="border px-2 py-2">{item.description}</td>
                      <td className="border px-2 py-2 text-center">{item.qty}</td>
                      <td className="border px-2 py-2 text-right">{item.rate}</td>
                      <td className="border px-2 py-2 text-right">{(item.qty * item.rate)}</td>
                      <td className="border px-2 py-2 text-right">{subTotal}</td>
                    </tr>
                  ))}
                  {/* Show subtotal for the invoice */}
                  <tr className="border-t border-black">
                    <td colSpan="3" className="font-semibold text-right">SUB TOTAL:</td>
                    <td className="font-bold text-right">{subTotal}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-black py-4">
        <div className="text-sm">
          <p className="font-semibold">
            Amount in words:{" "}
            <span className="font-normal">
              AED One hundred eighty-seven thousand five hundred dirhams and zero fills only
            </span>
          </p>
        </div>
        <div className="text-right text-sm">
          <p>TOTAL: <span className="font-bold">AED {data.reduce((acc, invoice) => {
            const totalAmount = invoice.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
            return acc + totalAmount * 0.5; // Add the 50% subtotal for each invoice
          }, 0).toFixed(2)}</span></p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 mt-6">
        <p>If you have any questions about this invoice, please contact</p>
        <p>MD SAZEDUR RAHMAN, +971 50 889 4701, E-mail: info@spd-technical.com</p>
      </footer>
    </div>
  );
};

export default ProformaView;

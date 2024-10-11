import React from "react";

const InvoiceTable = () => {
  return (
    <div className="max-w-full p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-black text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-black">
                Description of Work
              </th>
              <th className="px-4 py-2 border border-black">Qty & Unit</th>
              <th className="px-4 py-2 border border-black">Rate</th>
              <th className="px-4 py-2 border border-black">Amount (AED)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-black">
                • Cleaning of villa rain water drainage system
              </td>
              <td className="px-4 py-2 border border-black" rowSpan={6}>
                LS
              </td>
              <td className="px-4 py-2 border border-black" rowSpan={6}>
                40,000.00
              </td>
              <td className="px-4 py-2 border border-black" rowSpan={6}>
                42,000.00
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">
                • Repairing of electrical system
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">
                • Replacement of ground floor MDF skirting
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">
                • Ground floor internal painting
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">
                • Removing of marble/Tile floor stain
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">
                • Removing of external painting around the villa & boundary wall
                1m
              </td>
            </tr>
            <>
              <tr>
                <td
                  className="px-4 py-2 border border-black font-bold"
                  colSpan={3}
                >
                  Sub Total
                </td>
                <td className="px-4 py-2 border border-black">40,000.00</td>
              </tr>
              <tr>
                <td
                  className="px-4 py-2 border border-black font-bold"
                  colSpan={3}
                >
                  5% VAT
                </td>
                <td className="px-4 py-2 border border-black">2,000.00</td>
              </tr>
              <tr>
                <td
                  className="px-4 py-2 border border-black font-bold"
                  colSpan={3}
                >
                  Total Amount
                </td>
                <td className="px-4 py-2 border border-black">42,000.00</td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
      <p className="text-sm mt-2 font-bold">
        Total in words:{" "}
        <span className="uppercase">
          Forty-two thousand dirhams and zero fills only
        </span>
      </p>
      <p className="mt-1">
        Purchase order – <span className="font-bold">PO-0</span>
      </p>
    </div>
  );
};

export default InvoiceTable;

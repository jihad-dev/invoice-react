import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import InvoiceUpdate from "../../components/InvoiceUpdate/InvoiceUpdate";

const InvoiceDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/information/${_id}`)
      .then((res) => res.json())
      .then((data) => setUpdate(data));
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const {
    _id,
    billName,
    billNumber,
    grandTotal,
    items,
    dateStart,
    dueDate,
    billStreet,
    billZip,
    billCity,
    billEmail,
  } = useLoaderData();
  const navigate = useNavigate();
  // Calculate total amount
  const totalAmount = items.reduce(
    (acc, item) => acc + item.qty * item.rate,
    0
  );
  // Calculate VAT (15%)
  const vat = totalAmount * 0.15;

  // Total amount due with VAT
  const totalAmountDue = totalAmount + vat;

  // delete item
  const handleDeleteItem = (_id) => {
    console.log("delete", _id);
    fetch(`http://localhost:5000/information/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("delete data ");
          navigate("/list");
        }
      });
  };

  return (
    <div className="">
      <div className="bg-gray-50 p-6 max-w-[40rem] h-[670px] mx-auto my-10 rounded-lg shadow-md">
        {/* Status */}
        <div className="flex justify-end items-center mb-4">

          <div className="space-x-2">
            <>
              {/* Modal toggle button */}
              <Link>
                <button
                  onClick={toggleModal}
                  className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded"
                >
                  Edit
                </button>
              </Link>
              <Link to={`/preview/${_id}`}>
                <button className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                  Preview
                </button>
              </Link>
              {/* Main modal */}
              {isOpen && (
                <div
                  id="default-modal"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
                >
                  <div className="relative p-4 w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <button
                          type="button"
                          onClick={toggleModal}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* Modal body */}

                      <InvoiceUpdate update={update}></InvoiceUpdate>
                    </div>
                  </div>
                </div>
              )}
            </>
            <button
              onClick={() => handleDeleteItem(_id)}
              className="px-4 py-1 text-sm bg-red-100 text-red-700 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="text-gray-800 font-bold text-lg">#{billNumber}</h3>
          <p className="text-gray-600">{billName}</p>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-bold">Invoice Date</p>
            <p>{dateStart}</p>
          </div>
          <div>
            <p className="font-bold">Payment Due</p>
            <p>{dueDate}</p>
          </div>
          <div>
            <p className="font-bold text-sm">Bill to</p>
            <p>{billName}</p>
            <p>{billStreet}</p>
            <p>{billZip}</p>
            <p>{billCity}</p>
          </div>
          <div>
            <p className="font-bold">Sent to</p>
            <p>{billEmail}</p>
          </div>
        </div>

        {/* Item Info */}

        <div className="w-full my-4">
          <table className="min-w-full">
            <thead>
              <tr className="w-full bg-gray-200 text-left text-sm text-gray-600 uppercase tracking-wide">
                <th className="py-3 px-5">Item name</th>
                <th className="py-3 px-5">Qty.</th>
                <th className="py-3 px-5">Item price</th>
                <th className="py-3 px-5">Total</th>
              </tr>
            </thead>
            {items.map((item, idx) => (
              <tbody key={idx}>
                <tr className="border-b">
                  <td className="py-3 px-5">{item?.title}</td>
                  <td className="py-3 px-5">{item?.qty}</td>
                  <td className="py-3 px-5">{item?.rate}</td>
                  <td className="py-3 px-5">{item?.rate * item?.qty}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {/* Amount Due */}
        <div className="bg-gray-800 text-white text-center p-4 mt-4 rounded-lg">
          <span className="text-lg font-bold">Total Amount </span>
          <p className="text-2xl">${totalAmountDue}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { LifeLine } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

const InvoiceForm = () => {
  const [data, setData] = useState([]);

  const sigCanvas = useRef(null); // Ref for the signature canvas

  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch data with async/await and set loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/information");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    fetchData();
  }, []);

  // Generate a new invoice number
  const generateInvoiceNumber = () => `INV-${data?.length + 1}`;
  const invoiceNumber = generateInvoiceNumber();

  const [items, setItems] = useState([
    { title: "", rate: 0, qty: 1, tax: true }
  ]);

  const handleAddItem = () => {
    setItems([...items, { title: "", rate: 0, qty: 1, tax: true }]);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  // Calculate total amounts
  const calculateAmount = (rate, qty) => rate * qty;
  const subTotal = items.reduce(
    (acc, item) => acc + calculateAmount(item.rate, item.qty),
    0
  );
  const tax = (subTotal * 0.05).toFixed(2);
  const grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Capture the signature as a base64 image
      const signatureData = sigCanvas.current.toDataURL();

      const formData = new FormData(e.target);
      const invoiceData = {
        name: formData.get("name"),
        email: formData.get("email"),
        street1: formData.get("street1"),
        street2: formData.get("street2"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        items,
        billNumber: formData.get("billNumber"),
        dateStart: formData.get("dateStart"),
        grandTotal,
        signature: signatureData // Include signature in the payload
      };

      const response = await fetch("http://localhost:5001/information", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData)
      });
      if (!response.ok) throw new Error("Network response was not ok");
      await response.json();
      navigate("/list");
    } catch (error) {
      console.error("Error submitting the invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {loading ? (
        <div className="grid place-items-center h-screen">
          <LifeLine color="#65c949" size="medium" text="" textColor="" />
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Invoice</h1>
            </div>

            <div>
              {/* Bill To Information */}
              <div>
                <h2 className="font-semibold mb-4">To</h2>
                <div className="mb-4">
                  <label className="block font-medium">Company Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered w-full mt-2"
                    placeholder="Company Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered w-full mt-2"
                    placeholder="name@business.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Address</label>
                  <input
                    type="text"
                    name="street1"
                    className="input input-bordered w-full mt-2"
                    placeholder="Street1"
                  />
                  <input
                    type="text"
                    name="street2"
                    className="input input-bordered w-full mt-2"
                    placeholder="State2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="input input-bordered w-full mt-2"
                    placeholder="(123) 456 789"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    name="subject"
                    className="input input-bordered w-full"
                    placeholder="Enter your subject"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="p-10 rounded-md">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    name="billNumber"
                    readOnly
                    value={invoiceNumber}
                    className="w-full  px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="INV000"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    name="dateStart"
                    className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full border border-gray-300 p-4 rounded-lg"
              >
                <div className="lg:flex">
                  <button
                    onClick={() =>
                      setItems(items.filter((_, i) => i !== index))
                    }
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-gray-500 hover:text-red-500 cursor-pointer mr-1 mt-0 h-7 w-7"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <div className="mb-4 lg:mr-5 lg:w-[400px]">
                    <label className="block text-gray-700 font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleInputChange(index, "title", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="Item Title"
                    />
                  </div>
                </div>

                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="lg:w-[180px]">
                    <label className="block text-gray-700 font-medium mb-1">
                      Rate
                    </label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "rate",
                          parseFloat(e.target.value)
                        )
                      }
                      className="input input-bordered w-full"
                      placeholder="Item Rate"
                    />
                  </div>

                  <div className="lg:w-[180px]">
                    <label className="block text-gray-700 font-medium mb-1">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "qty",
                          parseInt(e.target.value)
                        )
                      }
                      className="input input-bordered w-full"
                      placeholder="Qty"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleAddItem}
                className="btn btn-outline btn-primary"
              >
                Add Item
              </button>
            </div>

            <div className="mt-6 lg:flex lg:justify-between">
              <div>
                <h3 className="font-medium">SubTotal: ${subTotal}</h3>
                <h3 className="font-medium">Tax (5%): ${tax}</h3>
                <h3 className="font-medium">Grand Total: ${grandTotal}</h3>
              </div>
            </div>

            {/* Signature Component */}
            {/* Signature Canvas */}
            <div className="mb-6">
              <h2 className="font-medium mb-2">Signature</h2>
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "border rounded-md"
                }}
              />
              <button
                type="button"
                onClick={clearSignature}
                className="btn btn-secondary mt-2"
              >
                Clear
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" className="btn btn-primary">
                Submit Invoice
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default InvoiceForm;

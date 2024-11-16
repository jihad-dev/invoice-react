import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceUpdate = ({ update }) => {
  const [items, setItems] = useState(
    update?.items || [{ title: "", rate: 0, qty: 1, tax: true }]
  );

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
  const tax = subTotal.toFixed(2); // 5% tax fixed
  // const tax = (subTotal * 0.05).toFixed(2); // 5% tax fixed
  const grandTotal = parseFloat(subTotal).toFixed(2);
  // const grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
  const navigate = useNavigate();
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      street1: formData.get("street1"),
      street2: formData.get("street2"),
      // zip: formData.get("zip"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      items,
      dateStart: formData.get("dateStart"),
      grandTotal
    };

    fetch(`https://invoice-final-server.vercel.app/information/${update?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/list");
      });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <form onSubmit={handleFormSubmit}>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Invoice</h1>
          </div>

          <div>
            {/* Bill To Information */}
            <div>
              <h2 className="font-semibold mb-4">To</h2>
              {/* Business Information */}
              <div className="mb-4">
                <label className="block font-medium">Company Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={update?.name}
                  className="input input-bordered w-full mt-2"
                  placeholder="Company Name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={update?.email}
                  className="input input-bordered w-full mt-2"
                  placeholder="name@business.com"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  name="street1"
                  defaultValue={update?.street1}
                  className="input input-bordered w-full mt-2"
                  placeholder="Street1"
                />
                <input
                  type="text"
                  name="street2"
                  defaultValue={update?.street2}
                  className="input input-bordered w-full mt-2"
                  placeholder="State2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={update?.phone}
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
                  defaultValue={update?.subject}
                  className="input input-bordered w-full"
                  placeholder="Enter your subject"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="p-10 rounded-md  ">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="billNumber"
                  readOnly
                  value={update?.billNumber}
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
                  defaultValue={update?.dateStart}
                  name="dateStart"
                  className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <>
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full border border-gray-300 p-4 rounded-lg"
            >
              <div className="lg:flex ">
                <button
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-gray-500 hover:text-red-500 cursor-pointer mr-1 mt-0 h-7 w-7 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <textarea
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  placeholder="Additional details"
                  className="mt-2 border border-gray-300 rounded px-4 py-2 w-full"
                ></textarea>
                <div>
                  <span>Price</span>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleInputChange(index, "rate", Number(e.target.value))
                    }
                    placeholder="0.00"
                    className="border border-gray-300 rounded px-4 py-2 lg:w-[14rem] text-right"
                  />
                </div>
              </div>

              <div className="flex">
                <div>
                  <span>Qty</span>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleInputChange(index, "qty", Number(e.target.value))
                    }
                    placeholder="1"
                    className="border border-gray-300 rounded px-4 my-3 py-2 lg:w-[14rem] w-44 text-right "
                  />
                </div>

                <div className="lg:w-44 my-7 text-right">
                  ${calculateAmount(item.rate, item.qty).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddItem}
              className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              className="text-white bg-blue-600 hover:bg-blue-500 px-8 py-2 rounded-lg"
              type="submit" // Added type="submit" for the button
            >
              Update
            </button>
            <div>
              <h2>Tax: 5%</h2>
              <h2>SubTotal: ${subTotal.toFixed(2)}</h2>
              {/* Formatting to fixed 2 decimals */}
              <h3>GrandTotal: ${grandTotal}</h3>
            </div>
          </div>
        </>
      </form>
    </div>
  );
};

export default InvoiceUpdate;

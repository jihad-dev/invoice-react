import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FileUploadWithPreview } from 'file-upload-with-preview';
// import 'file-upload-with-preview/dist/style.css';

const InvoiceForm = () => {
  // Function to generate a random invoice number
  const generateInvoiceNumber = () => {
    const timestamp = Date.now(); // Get the current timestamp
    const randomDigits = Math.floor(Math.random() * 1000); // Generate random 3-digit number
    return `INV-${randomDigits}`; // Combine them into a unique invoice number
  };
  const invoiceNumber = generateInvoiceNumber();

  // const upload = new FileUploadWithPreview('my-unique-id');
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [items, setItems] = useState([
    { title: "", description: "", rate: 0, qty: 1, tax: true },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      { title: "", description: "", rate: 0, qty: 1, tax: true },
    ]);
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
  const tax = (subTotal * 0.15).toFixed(2); // 15% tax fixed
  const grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
  const navigate = useNavigate();
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      street: formData.get("street"),
      city: formData.get("city"),
      zip: formData.get("zip"),
      phone: formData.get("phone"),
      number: formData.get("number"),
      items,
      billName: formData.get("billName"),
      billEmail: formData.get("billEmail"),
      billStreet: formData.get("billStreet"),
      billCity: formData.get("billCity"),
      billZip: formData.get("billZip"),
      billPhone: formData.get("billPhone"),
      billMobile: formData.get("billMobile"),
      billNumber: formData.get("billNumber"),
      dateStart: formData.get("dateStart"),
      dueDate: formData.get("dueDate"),
      grandTotal,
    };
    // Log form data and items
    console.log("Form Data:", data);

    fetch("http://localhost:5000/information", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        navigate("/list");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <form onSubmit={handleFormSubmit}>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Invoice</h1>
            <div className="border flex items-center justify-center">
              {/* <div class="custom-file-container" data-upload-id="my-unique-id"></div> */}
              {/* <input placeholder='Logo' type="file"  /> */}
              {/* <img className='w-25 border border-dashed' src={file} />
                            <input onChange={handleChange} placeholder='Logo' type="file" className="file-input file-input-bordered w-full" /> */}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            {/* Bill Form Information */}
            <div>
              <h2 className="font-semibold mb-4">From</h2>
              {/* Business Information */}
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
                  name="street"
                  className="input input-bordered w-full mt-2"
                  placeholder="Street"
                />
                <input
                  type="text"
                  name="city"
                  className="input input-bordered w-full mt-2"
                  placeholder="City, State"
                />
                <input
                  type="text"
                  name="zip"
                  className="input input-bordered w-full mt-2"
                  placeholder="Zip code"
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
                <label className="block font-medium">Business Number</label>
                <input
                  type="text"
                  name="number"
                  className="input input-bordered w-full"
                  placeholder="123-45-6789"
                />
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Bill To</h2>
              {/* Client Information */}
              <div className="mb-4">
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  required
                  name="billName"
                  className="input input-bordered w-full"
                  placeholder="Client Name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  required
                  name="billEmail"
                  className="input input-bordered w-full"
                  placeholder="name@client.com"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  required
                  name="billStreet"
                  className="input input-bordered w-full"
                  placeholder="Street"
                />
                <input
                  type="text"
                  required
                  name="billCity"
                  className="input input-bordered w-full mt-2"
                  placeholder="City, State"
                />
                <input
                  type="text"
                  required
                  name="billZip"
                  className="input input-bordered w-full mt-2"
                  placeholder="Zip code"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Phone</label>
                <input
                  type="text"
                  required
                  name="billPhone"
                  className="input input-bordered w-full"
                  placeholder="(123) 456 789"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Mobile</label>
                <input
                  type="text"
                  required
                  name="billMobile"
                  className="input input-bordered w-full"
                  placeholder="(123) 456 789"
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
                  defaultValue={invoiceNumber}
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
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Terms
                </label>
                <select className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Days</option>
                  <option>Weeks</option>
                  <option>Months</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Due
                </label>
                <input
                  required
                  type="date"
                  name="dueDate"
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
              <div className="flex justify-between items-center">
                {/* <button
                  className="text-red-500 border border-gray-300 rounded px-2 py-1"
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                >
                  X
                </button> */}
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

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  placeholder="Item title"
                  className="border border-gray-300 rounded px-4 py-2 w-1/2"
                />

                <div>
                  <span>Price</span>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleInputChange(index, "rate", Number(e.target.value))
                    }
                    placeholder="0.00"
                    className="border border-gray-300 rounded px-4 py-2 w-24 text-right"
                  />
                </div>

                <div>
                  <span>Qty</span>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleInputChange(index, "qty", Number(e.target.value))
                    }
                    placeholder="1"
                    className="border border-gray-300 rounded px-4 py-2 w-16 text-right"
                  />
                </div>

                <div className="w-24 text-right">
                  ${calculateAmount(item.rate, item.qty).toFixed(2)}
                </div>

                <input
                  type="checkbox"
                  checked={item.tax}
                  onChange={() => handleInputChange(index, "tax", !item.tax)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>

              <textarea
                type="text"
                value={item.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                placeholder="Additional details"
                className="mt-2 border border-gray-300 rounded px-4 py-2 w-full"
              ></textarea>
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
              Submit
            </button>
            <div>
              <h2>Tax: 15%</h2>
              <h2>SubTotal: ${subTotal.toFixed(2)}</h2>{" "}
              {/* Formatting to fixed 2 decimals */}
              <h3>GrandTotal: ${grandTotal}</h3>
            </div>
          </div>
        </>
      </form>
    </div>
  );
};

export default InvoiceForm;

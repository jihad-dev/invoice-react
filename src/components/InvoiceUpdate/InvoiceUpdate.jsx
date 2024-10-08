


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const InvoiceUpdate = ({ update }) => {


    // const [items, setItems] = useState([
    //     { description: "", rate: 0, qty: 1, tax: true },
    // ]);

    const [items, setItems] = useState(update?.items || [{ description: "", rate: 0, qty: 1, tax: true }]);


    const handleAddItem = () => {
        setItems([...items, { description: "", rate: 0, qty: 1, tax: true }]);
    };

    const handleInputChange = (index, field, value) => {
        const newItems = items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setItems(newItems);
    };

    // Calculate total amounts
    const calculateAmount = (rate, qty) => rate * qty;
    const subTotal = items.reduce((acc, item) => acc + calculateAmount(item.rate, item.qty), 0);
    const tax = (subTotal * 0.15).toFixed(2); // 15% tax fixed
    const grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
    const navigate = useNavigate();
    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            street: formData.get('street'),
            city: formData.get('city'),
            zip: formData.get('zip'),
            phone: formData.get('phone'),
            number: formData.get('number'),
            items,
            billName: formData.get('billName'),
            billEmail: formData.get('billEmail'),
            billStreet: formData.get('billStreet'),
            billCity: formData.get('billCity'),
            billZip: formData.get('billZip'),
            billPhone: formData.get('billPhone'),
            billMobile: formData.get('billMobile'),
            billNumber: formData.get('billNumber'),
            dateStart: formData.get('dateStart'),
            dueDate: formData.get('dueDate'),
            grandTotal,
        };
        // Log form data and items
        console.log('Form Data:', data);

        fetch(`http://localhost:5000/information/${update?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
        })
          

    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <form onSubmit={handleFormSubmit}>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Invoice</h1>
                        <div className="border flex items-center justify-center">
                            <input placeholder='Logo' type="file" className="file-input file-input-bordered w-full" />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <div>
                            <h2 className="font-semibold mb-4">From</h2>
                            {/* Business Information */}
                            <div className="mb-4">
                                <label className="block font-medium">Name</label>
                                <input type="text" defaultValue={update?.name} name='name' className="input input-bordered w-full mt-2" placeholder="Business Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Email</label>
                                <input name='email' defaultValue={update?.email} type="email" className="input input-bordered w-full mt-2" placeholder="name@business.com" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Address</label>
                                <input type="text" defaultValue={update?.street} name='street' className="input input-bordered w-full mt-2" placeholder="Street" />
                                <input type="text" defaultValue={update?.city} name='city' className="input input-bordered w-full mt-2" placeholder="City, State" />
                                <input type="text" defaultValue={update?.zip} name='zip' className="input input-bordered w-full mt-2" placeholder="Zip code" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Phone</label>
                                <input type="text" defaultValue={update?.phone} name='phone' className="input input-bordered w-full mt-2" placeholder="(123) 456 789" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Business Number</label>
                                <input type="text" defaultValue={update?.number} name='number' className="input input-bordered w-full" placeholder="123-45-6789" />
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold mb-4">Bill To</h2>
                            {/* Client Information */}
                            <div className="mb-4">
                                <label className="block font-medium">Name</label>
                                <input type="text" defaultValue={update?.billName} name='billName' className="input input-bordered w-full" placeholder="Client Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Email</label>
                                <input type="email" defaultValue={update?.billEmail} name='billEmail' className="input input-bordered w-full" placeholder="name@client.com" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Address</label>
                                <input type="text" defaultValue={update?.billStreet} name='billStreet' className="input input-bordered w-full" placeholder="Street" />
                                <input type="text" defaultValue={update?.billCity} name='billCity' className="input input-bordered w-full mt-2" placeholder="City, State" />
                                <input type="text" defaultValue={update?.billZip} name='billZip' className="input input-bordered w-full mt-2" placeholder="Zip code" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Phone</label>
                                <input type="text" defaultValue={update?.billPhone} name='billPhone' className="input input-bordered w-full" placeholder="(123) 456 789" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Mobile</label>
                                <input type="text" defaultValue={update?.billMobile} name='billMobile' className="input input-bordered w-full" placeholder="(123) 456 789" />
                            </div>
                        </div>

                        <div className="p-10 bg-white shadow-lg rounded-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Bill Number</label>
                                <input defaultValue={update?.billNumber}
                                    type="text"
                                    name='billNumber'
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="INV000"
                                />

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name='dateStart'
                                    defaultValue={update?.dateStart}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Terms</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Days</option>
                                    <option>Weeks</option>
                                    <option>Months</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Due</label>
                                <input
                                    type="date"
                                    defaultValue={update?.dueDate}
                                    name='dueDate'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <>
                    {items.map((item, index) => (
                        <div key={index} className="w-full border border-gray-300 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <button
                                    className="text-red-500 border border-gray-300 rounded px-2 py-1"
                                    onClick={() =>
                                        setItems(items.filter((_, i) => i !== index))
                                    }
                                >
                                    X
                                </button>

                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleInputChange(index, "description", e.target.value)
                                    }
                                    placeholder="Item Description"
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
                                    onChange={() =>
                                        handleInputChange(index, "tax", !item.tax)
                                    }
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                            </div>

                            <textarea
                                placeholder="Additional details"
                                className="mt-2 border border-gray-300 rounded px-4 py-2 w-full"
                            ></textarea>
                        </div>
                    ))}

                    <div className="mt-4">
                        <button type='button'
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
                            <h2>Tax: 15%</h2>
                            <h2>SubTotal: ${subTotal.toFixed(2)}</h2> {/* Formatting to fixed 2 decimals */}
                            <h3>GrandTotal: ${grandTotal}</h3>
                        </div>
                    </div>
                </>
            </form>
        </div>
    );
};

export default InvoiceUpdate;

import React from 'react';
import InvoiceItem from '../InvoiceItem/InvoiceItem';

const InvoiceForm = () => {
    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Invoice</h1>
                    <div className="w-32 h-32 border flex items-center justify-center">
                        <span>+ Logo</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="font-semibold mb-4">From</h2>
                        <div className="mb-4">
                            <label className="block font-medium">Name</label>
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="Business Name" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Email</label>
                            <input type="email" className="input input-bordered w-full mt-2" placeholder="name@business.com" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Address</label>
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="Street" />
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="City, State" />
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="Zip code" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Phone</label>
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="(123) 456 789" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Business Number</label>
                            <input type="text" className="input input-bordered w-full" placeholder="123-45-6789" />
                        </div>

                    </div>

                    <div>
                        <h2 className="font-semibold mb-4">Bill To</h2>
                        <div className="mb-4">
                            <label className="block font-medium">Name</label>
                            <input type="text" className="input input-bordered w-full" placeholder="Client Name" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Email</label>
                            <input type="email" className="input input-bordered w-full" placeholder="name@client.com" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Address</label>
                            <input type="text" className="input input-bordered w-full" placeholder="Street" />
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="City, State" />
                            <input type="text" className="input input-bordered w-full mt-2" placeholder="Zip code" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Phone</label>
                            <input type="text" className="input input-bordered w-full" placeholder="(123) 456 789" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Mobile</label>
                            <input type="text" className="input input-bordered w-full" placeholder="(123) 456 789" />
                        </div>

                    </div>
                </div>
            </div>
            {/*  */}
            <div className="max-w-md  p-4 bg-white shadow-lg rounded-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Number</label>
                    <input
                        type="text"

                        className={`w-full px-3 py-2 border 
                             rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="INV000"
                    />

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Date</label>
                    <input
                        type="date"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
               
                    />
                </div>
            </div>
            {/*  */}
            <InvoiceItem></InvoiceItem>
        </div>
    );
};

export default InvoiceForm;

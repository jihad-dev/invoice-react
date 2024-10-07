import React from 'react';
import { useLoaderData } from 'react-router-dom';

const InvoiceDetails = () => {
    const {billName,billNumber,grandTotal,items,dateStart} = useLoaderData();
    
    
    return (
        <div>
           
            <div className="bg-gray-50 p-6 max-w-lg mx-auto my-10 rounded-lg shadow-md">
                {/* Status */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">paid</span>
                    </div>
                    <div className="space-x-2">
                        <button className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded">Edit</button>
                        <button className="px-4 py-1 text-sm bg-red-100 text-red-700 rounded">Delete</button>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-gray-800 font-bold text-lg">#{billNumber
                    }</h3>
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
                        <p>Aug 19, 2021</p>
                    </div>
                    <div>
                        <p className="font-bold">Bill to</p>
                        <p>{billName}</p>
                        <p>106 Kendell Street</p>
                        <p>Sharrington, NR24 5WQ</p>
                        <p>United Kingdom</p>
                    </div>
                    <div>
                        <p className="font-bold">Sent to</p>
                        <p>jensenh@mail.com</p>
                    </div>
                </div>

                {/* Item Info */}
                <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">Item name</span>
                        <span className="font-bold text-gray-800">Total</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Brand Guidelines</span>
                        <span className="text-gray-700">${grandTotal
                        }</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Qty</span>
                        {/* {items.map(item =><>{item.qty}</>)} */}
                        <span className="text-gray-700">1</span>
                    </div>
                </div>

                {/* Amount Due */}
                <div className="bg-gray-800 text-white text-center p-4 mt-4 rounded-lg">
                    <span className="text-lg font-bold">Amount Due</span>
                    <p className="text-2xl">£1800.9</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;
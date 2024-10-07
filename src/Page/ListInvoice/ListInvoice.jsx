import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ListInvoice = () => {
    const informations = useLoaderData();
    return (
        <div>
            {
                informations?.map((information,idx) => <Link key={idx} to={`/details/${information?._id}`}><div className="flex justify-center items-center lg:p-4 p-3">
                    <div className="w-full max-w-[800px] mx-auto bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
                        <div>
                            <span className="text-blue-500 lg:p-2 p-1 font-medium">#{information?.billNumber}</span>
                            <span className="text-gray-500 lg:p-2 p-1 text-sm">{information?.dueDate}</span>
                            <span className="text-gray-900 lg:p-2 p-1 font-medium">{information?.billName}</span>

                        </div>
                        <div>
                            <span className="text-gray-900 font-semibold">${information?.grandTotal}</span>
                        </div>
                    </div>
                </div></Link>)
            }




        </div>
    );
};

export default ListInvoice;
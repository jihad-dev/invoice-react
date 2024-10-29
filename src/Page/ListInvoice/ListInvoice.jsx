import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const ListInvoice = () => {
  const informations = useLoaderData();


  return (
    <div>
      <Link className="" to="/">
        <button className="bg-blue-500 my-12 lg:my-14 ml-12 lg:ml-14 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 hover:bg-blue-600">
          Back
        </button>
      </Link>

      {informations &&
        informations?.map((information, idx) => (
          <Link key={idx} to={`/details/${information?._id}`}>
            <div className="flex justify-center items-center lg:p-4 p-3">
              <div className="w-full max-w-[800px] mx-auto bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
                <div>
                  <span className="text-blue-500 lg:p-2 p-1 font-medium">
                    #{information?.billNumber}
                  </span>
                  {/* <span className="text-gray-500 lg:p-2 p-1 text-sm">
                    {information?.email}
                  </span> */}
                  <span className="text-gray-900 lg:p-2 p-1 font-medium">
                    {information?.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-900 font-semibold">
                    ${information?.grandTotal}
                    
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ListInvoice;

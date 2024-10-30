// import React, { useEffect, useState } from "react";
// import { LifeLine } from "react-loading-indicators";
// import { Link } from "react-router-dom";

// const ListProforma = () => {
//   const [listData, setListData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Assuming you have a fetch URL
//         const response = await fetch('https://invoice-server-sigma.vercel.app/proforma'); // Replace with your actual API endpoint
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setListData(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid place-items-center h-screen">
//         <LifeLine color="#65c949" size="medium" text="" textColor="" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center mt-12">{error}</div>;
//   }

//   return (
//     <div>
//       <Link className="" to="/proforma">
//         <button className="bg-blue-500 my-12 lg:my-14 ml-12 lg:ml-14 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 hover:bg-blue-600">
//           Back
//         </button>
//       </Link>

//       {listData.map((information) => (
//         <Link className="h-96 overflow-x-auto" key={information?._id} to={`/view/${information?._id}`}>
//           <div className="flex justify-center items-center lg:p-4 p-3 ">
//             <div className="w-full max-w-[800px] mx-auto bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
//               <div>
//                 <span className="text-blue-500 lg:p-2 p-1 font-medium">
//                   #{information?.billNumber}
//                 </span>
//                 <span className="text-gray-900 lg:p-2 p-1 font-medium">
//                   {information?.name}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-gray-900 font-semibold">
//                   ${information?.subTotal}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default ListProforma;

import React, { useEffect, useState } from "react";
import { LifeLine } from "react-loading-indicators";
import { Link } from "react-router-dom";

const ListProforma = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://invoice-server-sigma.vercel.app/proforma"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setListData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center h-screen">
        <LifeLine color="#65c949" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-12">{error}</div>;
  }

  return (
    <div>
      <Link className="" to="/proforma">
        <button className="bg-blue-500 my-12 lg:my-14 ml-12 lg:ml-14 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 hover:bg-blue-600">
          Back
        </button>
      </Link>

      {/* Container for horizontal scrolling */}
      <div className=" h-96 overflow-x-auto">
        <div>
          
          {/* Added space between items */}
          {listData.map((information) => (
            <Link key={information?._id} to={`/view/${information?._id}`}>
              <div className=" bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
                {" "}
                {/* Set a fixed width */}
                <div>
                  <span className="text-blue-500 lg:p-2 p-1 font-medium">
                    #{information?.billNumber}
                  </span>
                  <span className="text-gray-900 lg:p-2 p-1 font-medium">
                    {information?.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-900 font-semibold">
                    ${information?.subTotal}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProforma;

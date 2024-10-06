

// import React, { useState } from "react";

// function InvoiceItem() {
//     const [items, setItems] = useState([
//         { description: "", rate: 0, qty: 1, tax: true },
//     ]);

//     const handleAddItem = () => {
//         setItems([...items, { description: "", rate: 0, qty: 1, tax: true }]);
//     };

//     const handleInputChange = (index, field, value) => {
//         const newItems = items.map((item, i) =>
//             i === index ? { ...item, [field]: value } : item
//         );
//         setItems(newItems);
//     };

//     const calculateAmount = (rate, qty) => rate * qty;

//     return (
//         <>
//             {items.map((item, index) => (
//                 <div key={index} className="w-full border border-gray-300 p-4 rounded-lg">
//                     <div className="flex justify-between items-center">
//                         {/* Delete button */}
//                         <button
//                             className="text-red-500 border border-gray-300 rounded px-2 py-1"
//                             onClick={() =>
//                                 setItems(items.filter((_, i) => i !== index))
//                             }
//                         >
//                             X
//                         </button>

//                         {/* Description input */}
//                         <input
//                             type="text"
//                             value={item.description}
//                             onChange={(e) =>
//                                 handleInputChange(index, "description", e.target.value)
//                             }
//                             placeholder="Item Description"
//                             className="border border-gray-300 rounded px-4 py-2 w-1/2"
//                         />

//                         {/* Rate input */}
//                         <div>
//                             <span>Price</span>
//                             <input
//                                 type="number"
//                                 value={item.rate}
//                                 onChange={(e) =>
//                                     handleInputChange(index, "rate", Number(e.target.value))
//                                 }
//                                 placeholder="0.00"
//                                 className="border border-gray-300 rounded px-4 py-2 w-24 text-right"
//                             />
//                         </div>

//                         {/* Quantity input */}
//                         <div>
//                             <span>Qty</span>
//                             <input
//                                 type="number"
//                                 value={item.qty}
//                                 onChange={(e) =>
//                                     handleInputChange(index, "qty", Number(e.target.value))
//                                 }
//                                 placeholder="1"
//                                 className="border border-gray-300 rounded px-4 py-2 w-16 text-right"
//                             />
//                         </div>

//                         {/* Amount display */}
//                         <div className="w-24 text-right">
//                             ${calculateAmount(item.rate, item.qty).toFixed(2)}
//                         </div>

//                         {/* Tax checkbox */}
//                         <input
//                             type="checkbox"
//                             checked={item.tax}
//                             onChange={() =>
//                                 handleInputChange(index, "tax", !item.tax)
//                             }
//                             className="form-checkbox h-5 w-5 text-blue-600"
//                         />
//                     </div>

//                     {/* Additional details input */}
//                     <textarea
//                         placeholder="Additional details"
//                         className="mt-2 border border-gray-300 rounded px-4 py-2 w-full"
//                     ></textarea>
//                 </div>
//             ))}

//             <div className="mt-4">
//                 <button
//                     onClick={handleAddItem}
//                     className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
//                 >
//                     +
//                 </button>
//             </div>
//         </>
//     );
// }

// export default InvoiceItem;

























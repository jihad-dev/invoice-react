// // SignatureCanvasComponent.js
// import React, { useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';

// const SignatureCanvasComponent = ({ onSaveSignature }) => {
//   const sigCanvas = useRef(null);

//   const saveSignature = () => {
//     const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
//     onSaveSignature(signatureData); // Pass the signature data to the parent component
//   };

//   const clearSignature = () => {
//     sigCanvas.current.clear();
//   };

//   return (
//     <div className="mt-6 p-4 border rounded-md bg-gray-100">
//       <h3 className="font-medium mb-2">Signature</h3>
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor="black"
//         canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
//       />
//       <div className="mt-2 flex gap-2">
//         <button
//           onClick={clearSignature}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
//         >
//           Clear
//         </button>
//         <button
//           onClick={saveSignature}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignatureCanvasComponent;

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
const SignatureCanvasComponent = ({ onSaveSignature }) => {
  const sigCanvas = useRef(null);

  const saveSignature = () => {
    const signatureData = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    onSaveSignature(signatureData); // Pass the signature data to the parent component
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-100">
      <h3 className="font-medium mb-2">Signature</h3>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 400, height: 150, className: "signature-canvas" }}
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={clearSignature}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={saveSignature}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvasComponent;

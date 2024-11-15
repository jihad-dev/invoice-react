// import React, { useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";

// const SignatureComponent = () => {
//   const sigCanvas = useRef(null);

//   const saveSignature = async () => {
//     // Get the base64 signature data
//     const signatureData = sigCanvas.current.toDataURL(); 
//     console.log(signatureData)// This is the base64 string
//   };
//   const clearSignature = () => {
//     sigCanvas.current.clear();  // Clear the canvas
//   };
//   return (
//     <div>
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor="black"
//         backgroundColor="white"
//         canvasProps={{ width: 500, height: 200, className: "signature-canvas" }}
//       />
//       <button onClick={saveSignature}>Save Signature</button>
//       <button onClick={clearSignature}>Clear </button>
//     </div>
//   );
// };

// export default SignatureComponent;

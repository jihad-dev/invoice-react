import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home.jsx";
import ListInvoice from "./Page/ListInvoice/ListInvoice.jsx";
import InvoiceDetails from "./Page/InvoiceDetails/InvoiceDetails.jsx";
import Preview from "./Page/Preview/Preview.jsx";
import Proforma from "./Page/Proforma/Proforma.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list",
    element: <ListInvoice />,
    loader: () => fetch("http://localhost:5000/information"),
  },
  {
    path: "/details/:id",
    element: <InvoiceDetails></InvoiceDetails>,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/information/${params.id}`),
  },
  {
    path: "/preview/:id",
    element: <Preview />,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/information/${params.id}`),
  },
  // proforma invoice //
  {
    path:'/proforma',
    element:<Proforma/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home.jsx";
import ListInvoice from "./Page/ListInvoice/ListInvoice.jsx";
import InvoiceDetails from "./Page/InvoiceDetails/InvoiceDetails.jsx";
import Preview from "./Page/Preview/Preview.jsx";
import Proforma from "./Page/Proforma/Proforma.jsx";
import ProformaView from "./Page/ProformaView/ProformaView.jsx";
import ListProforma from "./Page/ListProforma/ListProforma.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list",
    element: <ListInvoice />,
    loader: () => fetch("https://invoice-final-server.vercel.app/information"),
  },
  {
    path: "/details/:id",
    element: <InvoiceDetails></InvoiceDetails>,
    loader: ({ params }) =>
      fetch(`https://invoice-final-server.vercel.app/information/${params.id}`),
  },
  {
    path: "/preview/:id",
    element: <Preview />,
    loader: ({ params }) =>
      fetch(`https://invoice-final-server.vercel.app/information/${params.id}`),
  },
  // proforma invoice //
  {
    path: "/proforma",
    element: <Proforma />,
  },
  {
    path: "/listproforma",
    element: <ListProforma />,
  },
  {
    path: "/view/:id",
    element: <ProformaView />,
    loader: ({params}) => fetch(`https://invoice-final-server.vercel.app/proforma/${params.id}`),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);

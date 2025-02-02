import React from "react";
import "./index.css";
import RootLayout from "./Components/RootComponents/RootLayout";
import Home from "./Pages/Client/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Pages/Client/About";
import ServicesSection from "./Pages/Client/Services";
import Services from "./Pages/Client/Services";
export default function App() {
  let router;

  router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "services",
          element: <Services />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

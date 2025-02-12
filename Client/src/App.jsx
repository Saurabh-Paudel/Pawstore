import React from "react";
import "./index.css";
import RootLayout from "./Components/RootComponents/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Client side imports
import Home from "./Pages/Client/Home";
import About from "./Pages/Client/About";
import Services from "./Pages/Client/Services";
import TeamSection from "./Pages/Client/Team";
import FAQsSection from "./Pages/Client/FAQs";
import CareersSection from "./Pages/Client/Career";
import ContactUs from "./Pages/Client/Contact";
import Breed from "./Pages/Client/Breed";
import AccessoriesPage from "./Pages/Client/Accessories";
import BlogSection from "./Pages/Client/Blog";
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
        {
          path: "team",
          element: <TeamSection />,
        },
        {
          path: "faq",
          element: <FAQsSection />,
        },
        {
          path: "careers",
          element: <CareersSection />,
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
        {
          path: "breeds",
          element: <Breed />,
        },
        {
          path: "accessories",
          element: <AccessoriesPage />,
        },
        {
          path: "blogs",
          element: <BlogSection />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

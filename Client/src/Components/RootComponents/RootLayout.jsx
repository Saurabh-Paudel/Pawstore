import React from "react";
import Header from "../RootComponents/Navbar";
import Footer from "../RootComponents/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

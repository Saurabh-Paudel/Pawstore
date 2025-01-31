import React from "react";
import Header from "../RootComponents/Navbar";
import Footer from "../RootComponents/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

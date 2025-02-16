import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function SellerLayout({ setUser }) {
  return (
    <div className="flex">
      <Sidebar setUser={setUser} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

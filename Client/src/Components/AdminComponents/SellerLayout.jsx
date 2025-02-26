import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function SellerLayout({ setUser }) {
  return (
    <div className="flex flex-col overflow-auto bg-gray-100">
      <div className="flex flex-1">
        <Sidebar setUser={setUser} />
        <div className="flex-1 flex flex-col min-h-0">
          <Navbar />
          <div className="p-4 overflow-y-auto flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

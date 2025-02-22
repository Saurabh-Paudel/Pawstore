import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function BuyerLayout({ setUser }) {
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

"use client";
import React from "react";
import { signOut } from "next-auth/react";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 bg-purple-100 shadow px-6 py-4 flex justify-between items-center z-30">
      <h1 className="text-xl font-semibold ml-6 md:ml-0"> Agenda</h1>
      <div className="">
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  );
};

export default DashboardHeader;

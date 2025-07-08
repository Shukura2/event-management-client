import React from "react";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 bg-purple-100 shadow px-6 py-4 flex justify-between items-center z-30">
      <h1 className=" text-xl font-semibold"> Agenda</h1>
      <div className=" flex items-center space-x-3">
        <span className=" text-gray-700">Admin</span>
        <p>img</p>
      </div>
    </header>
  );
};

export default DashboardHeader;

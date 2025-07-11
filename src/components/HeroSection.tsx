"use client";

import React from "react";

const HeroSection = () => {
  const handleScroll = () => {
    document
      .getElementById("target-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="h-[calc(100vh-100px)] flex max-w-[1200px] p-5 md:py-7 md:px-9 items-center my-auto mx-auto">
      <div>
        <h2 className="font-bold text-2xl lg:text-7xl text-white">
          We have the best events. <br /> Get your ticket now!
        </h2>
        <button
          onClick={handleScroll}
          className="px-11 py-4 border-2 border-[#fff] mt-11 bg-gradient-to-l from-[#AB00E5] to-[#581479] rounded-[50px] text-lg text-white font-bold capitalize "
        >
          view events
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

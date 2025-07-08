"use client";

import React from "react";

const HeroSection = () => {
  const handleScroll = () => {
    document
      .getElementById("target-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="h-[calc(100vh-100px)] flex items-center my-auto lg:max-w-[1200px] sm:max-w-[650px] md:max-w-[730px] mx-auto px-5 lg:px-0">
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

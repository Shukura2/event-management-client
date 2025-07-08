import React from "react";

const Subscribe = () => {
  return (
    <div className="subscribe-wrap py-36 lg:py-44">
      <div className="sm:max-w-[650px] md:max-w-[730px] lg:max-w-[1200px] mx-auto px-4 md:px-0">
        <h2 className=" text-4xl font-bold text-white text-center lg:text-[43px] lg:mb-8">
          Subscribe to our newsletter to get the latest trends & news
        </h2>
        <p className=" my-5 text-center font-bold text-white text-lg lg:text-3xl lg:mb-[150px]">
          Join our database NOW!
        </p>

        <div className=" lg:flex items-center w-full">
          <input
            type="text"
            placeholder="Name"
            className=" w-full py-4 px-6 rounded-md mb-7 italic lg:w-[30%] lg:mr-5 lg:mb-0"
          />

          <input
            type="text"
            placeholder="Your e-mail"
            className=" w-full py-4 px-6 rounded-md mb-7 italic lg:w-[52%] lg:mr-10 lg:mb-0"
          />

          <div className=" flex justify-center">
            <button className=" bg-gradient-to-l from-[#AB00E5] to-[#581479] py-4 px-10 border-2 border-white rounded-[50px] text-white font-bold text-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;

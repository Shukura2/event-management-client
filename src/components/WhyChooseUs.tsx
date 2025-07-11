import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="mx-auto max-w-[1200px] md:flex md:justify-between md:pb-0">
      <div className="mb-14 p-5 md:pt-[150px] md:px-9 md:mb-0 md:w-[38%]">
        <Image
          src="https://preview.colorlib.com/theme/agenda/images/logo-2.png"
          alt="image"
          width={310}
          height={238}
        />
      </div>
      <div className="md:w-[58%] p-5 md:pt-[150px] md:px-9">
        <h2 className="text-4xl lg:text-5xl font-bold mb-5">
          What is Agenda and why choose our services?
        </h2>
        <p className="text-[#777777] text-lg leading-loose ">
          Vestibulum eget lacus at mauris sagittis varius. Etiam ut venenatis
          dui. Nullam tellus risus, pellentesque at facilisis et, scelerisque
          sit amet metus. Duis vel semper turpis, ac tempus libero. Maecenas id
          ultrices risus. Aenean nec ornare ipsum, lacinia volutpat urna.
          Maecenas ut aliquam purus, quis sodales dolor.
        </p>
        <div className="mt-8 lg:mt-10">
          <button className="px-8 py-3 bg-gradient-to-l from-[#AB00E5] to-[#581479] mb-8 mr-4 text-white text-lg font-bold rounded-[50px]">
            Read More
          </button>
          <button className="px-8 py-3 bg-black text-white text-lg font-bold rounded-[50px]">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

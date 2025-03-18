import React from "react";
import HeroPic from "/Hero-pic.png";

const Hero = () => {
  const SectionTitle = ({ text, align = "center" }) => (
    <div className={`flex items-center gap-2 justify-${align}`}>
      <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
      <p className="font-medium text-sm md:text-base">{text}</p>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto border-2 border-gray-400 p-4 sm:p-8">
      {/* Hero Left */}
      <div className="sm:w-1/2 flex items-center justify-center py-10 sm:py-0 text-center sm:text-left">
        <div className="text-[#414141] max-w-md">
          <SectionTitle
            text="OUR BESTSELLERS"
            align="center sm:justify-start"
          />
          <h1 className="text-4xl sm:text-7xl sm:py-3 leading-relaxed">
            Latest Arrivals
          </h1>
          <SectionTitle text="SHOP NOW" align="center sm:justify-start" />
        </div>
      </div>

      {/* Hero Right */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          src={HeroPic}
          className="w-full max-w-sm sm:max-w-full"
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;

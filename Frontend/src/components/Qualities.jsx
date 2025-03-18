import React from "react";
import "../Onopen.css";
import Title from "./Title";

const qualities = [
  "Curated Rare Items",
  "Transparent Pricing",
  "Exclusive Access",
];

const Qualities = () => {
  return (
    <div className="w-full h-auto mt-10">
      {/* Section Title */}
      <div className="text-center py-8 text-5xl">
        <Title text1="WHY" text2="CHOOSE TRITOPIA" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600"></p>
      </div>

      {/* Quality Cards */}
      <div className="w-full flex justify-center">
        <ul className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {qualities.map((quality, index) => (
            <li
              key={index}
              className="fade-out p-10 sm:p-20 text-2xl sm:text-4xl w-full h-40 sm:h-80 rounded-3xl flex items-center justify-center text-center bg-gray-100 shadow-lg"
            >
              {quality}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Qualities;

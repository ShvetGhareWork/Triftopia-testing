import React from "react";

const Navbar = ({ setToken }) => (
  <div className="flex items-center justify-between py-2 px-[4%]">
    <img className="w-40 sm:w-52" src="" alt="Admin Logo" />
    <button
      onClick={() => setToken("")}
      className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm transition hover:bg-gray-700"
    >
      Log Out
    </button>
  </div>
);

export default Navbar;

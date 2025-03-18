import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { path: "/add-product", label: "Add Items" },
    { path: "/list-product", label: "List Items" },
    { path: "/orders", label: "Orders Items" },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r mr-20">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition hover:bg-gray-100"
          >
            <img className="w-5 h-5" src="" alt="" />
            <p className="hidden md:block">{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

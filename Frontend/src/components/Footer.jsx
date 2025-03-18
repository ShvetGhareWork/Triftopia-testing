import React from "react";
import Logo from "/weblogo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];

  const contactDetails = [
    { icon: "📞", text: "+91-72498-32504" },
    { icon: "📧", text: "support@triftopia.com" },
  ];

  const FooterSection = ({ title, children }) => (
    <div className="text-center sm:text-left">
      <p className="text-lg font-semibold mb-3">{title}</p>
      {children}
    </div>
  );

  return (
    <footer className="py-10 px-5">
      {/* Main Footer Section */}
      <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-14 items-center sm:items-start my-10">
        {/* Logo & Description */}
        <FooterSection>
          <img
            src={Logo}
            alt="Triftopia Logo"
            className="w-24 mx-auto sm:mx-0 mb-5"
          />
          <p className="max-w-[400px] text-gray-600 text-sm">
            At Triftopia, we bring you a curated collection of rare, vintage,
            and limited-edition treasures. From collectibles to unique fashion
            pieces, explore a world of exclusivity with us.
          </p>
        </FooterSection>

        {/* Company Links */}
        <FooterSection title="COMPANY">
          <ul className="flex flex-col gap-1 text-gray-600 text-sm">
            {footerLinks.map(({ name, path }) => (
              <li key={name}>
                <NavLink to={path} className="hover:text-gray-900">
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Contact Details */}
        <FooterSection title="GET IN TOUCH">
          <ul className="flex flex-col gap-1 text-gray-600 text-sm">
            {contactDetails.map(({ icon, text }, index) => (
              <li key={index} className="hover:text-gray-900">
                {icon} {text}
              </li>
            ))}
          </ul>
        </FooterSection>
      </div>

      {/* Bottom Section */}
      <div className="text-center">
        <hr className="w-4/5 mx-auto border-gray-300" />
        <p className="py-5 text-sm font-medium text-gray-600">
          &copy; 2025 Triftopia - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

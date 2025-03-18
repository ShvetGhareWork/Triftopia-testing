import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Title from "../components/Title.jsx";
import NewsLetter from "../components/NewLetter.jsx";
import Footer from "../components/Footer.jsx";
import contact from "/contactusimg.png";

const Contact = () => (
  <div>
    <Navbar />
    <div className="text-center text-2xl pt-10">
      <Title text1="CONTACT" text2="US" />
    </div>

    {/* Contact Info Section with Animation */}
    <motion.div
      className="my-10 flex flex-col md:flex-row justify-center items-center gap-10 mb-28"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src={contact} className="w-full md:max-w-[480px]" alt="Contact Us" />
      <div className="flex flex-col gap-6 text-gray-600">
        <div>
          <h2 className="font-semibold text-2xl">Our Store</h2>
          <p className="text-lg text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington DC
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Contact</h2>
          <p className="text-lg text-gray-500">Tel: +91 7249832504</p>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Careers at Forever</h2>
          <p className="text-lg text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-lg hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </motion.div>

    <NewsLetter />
    <Footer />
  </div>
);

export default Contact;

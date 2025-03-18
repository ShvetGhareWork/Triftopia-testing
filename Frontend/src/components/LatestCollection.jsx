import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import "../Onopen.css";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = products.slice(0, 10);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Discover our newest arrivals – where timeless style meets modern
          flair!"
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {latestProducts.map((item) => (
          <motion.div key={item._id} variants={itemVariants}>
            <ProductItem {...item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestCollection;

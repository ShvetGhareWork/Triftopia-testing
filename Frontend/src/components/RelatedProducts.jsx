import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
import Title from "./Title";

const RelatedProducts = ({
  category,
  subcategory,
  rarity_level,
  condition,
}) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" },
    },
  };

  useEffect(() => {
    if (products.length) {
      const filteredProducts = products.filter(
        (item) =>
          item.category === category &&
          item.subcategory === subcategory &&
          item.condition === condition &&
          item.rarity_level === rarity_level
      );
      setRelated(filteredProducts.slice(0, 5));
    }
  }, [category, subcategory, rarity_level, condition, products]);

  return (
    <>
      <div className="w-full text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <motion.div
            key={item._id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </motion.div>
        ))}
      </div>
      <hr className="opacity-0 mt-10 mb-10" />
    </>
  );
};

// PropTypes validation
RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
  rarity_level: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
};

export default RelatedProducts;

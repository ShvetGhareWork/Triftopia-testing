import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import TrueFocus from "../components/TrueFocus.jsx";
import { Link } from "react-router-dom";

const Rarity = () => {
  const { products } = useContext(ShopContext);
  const [categorizedItems, setCategorizedItems] = useState({
    Common: [],
    Rare: [],
    UltraRare: [],
  });

  // Categorize items in one go
  useEffect(() => {
    const rarityMap = {
      Common: [],
      Rare: [],
      UltraRare: [],
    };

    products
      .filter((item) => item.category === "Limited-Edition")
      .forEach((item) => {
        if (item.rarityLevel === "Common") rarityMap.Common.push(item);
        if (item.rarityLevel === "Rare") rarityMap.Rare.push(item);
        if (item.rarityLevel === "Ultra-Rare") rarityMap.UltraRare.push(item);
      });

    setCategorizedItems({
      Common: rarityMap.Common.slice(0, 5),
      Rare: rarityMap.Rare.slice(0, 5),
      UltraRare: rarityMap.UltraRare.slice(0, 5),
    });
  }, [products]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Reusable section component
  const RaritySection = ({ title, items }) => (
    <div className="mt-10">
      <div className="text-center flex justify-around items-center text-4xl py-8">
        <Title text1="RARITY:" text2={title} />
        <Link
          to="/limited-access/limited-collection"
          className="w-40 text-xs sm:text-sm md:text-base text-gray-600"
        >
          DIVE IN
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {items.map((item) => (
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
    </div>
  );

  // PropType validation for RaritySection
  RaritySection.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

  return (
    <>
      <div className="mt-10"></div>
      <TrueFocus
        sentence="LIMITED ACCESS"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />
      <RaritySection title="COMMON" items={categorizedItems.Common} />
      <RaritySection title="RARE" items={categorizedItems.Rare} />
      <RaritySection title="ULTRA-RARE" items={categorizedItems.UltraRare} />
    </>
  );
};

export default Rarity;

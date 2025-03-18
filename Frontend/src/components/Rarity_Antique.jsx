import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";
import TrueFocus from "./TrueFocus.jsx";
import { Link } from "react-router-dom";

const Rarity_Antique = () => {
  const { products } = useContext(ShopContext);
  const [categorizedItems, setCategorizedItems] = useState({
    Common: [],
    Rare: [],
    UltraRare: [],
  });

  useEffect(() => {
    const rarityLevels = ["Common", "Rare", "Ultra-Rare"];
    const categorized = rarityLevels.reduce((acc, rarity) => {
      acc[rarity] = products
        .filter(
          (item) => item.category === "Antique" && item.rarityLevel === rarity
        )
        .slice(0, 5);
      return acc;
    }, {});
    setCategorizedItems(categorized);
  }, [products]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const rarities = [
    { name: "COMMON", items: categorizedItems.Common },
    { name: "RARE", items: categorizedItems.Rare },
    { name: "ULTRA-RARE", items: categorizedItems.UltraRare },
  ];

  return (
    <>
      <div className="mt-10"></div>
      <TrueFocus
        sentence="ANTIQUE ACCESS"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />

      {rarities.map(({ name, items }) => (
        <div className="mt-10" key={name}>
          <div className="text-center flex justify-around items-center text-4xl py-8">
            <Title text1="RARITY:" text2={name} />
            <Link
              to="/antique-access/antique-collection"
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
      ))}
    </>
  );
};

export default Rarity_Antique;

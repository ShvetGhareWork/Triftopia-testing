import React, { useContext, useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title.jsx";
import { motion } from "framer-motion";
import ProductItem from "../components/ProductItem.jsx";

const AntiqueCollection = () => {
  const { products, Search, ShowSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("Relevant");

  const antiques = products.filter((item) => item.category === "Antique");

  const handleToggle = (value, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = useCallback(() => {
    let filtered = antiques;

    if (Search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(Search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.rarityLevel));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.some((sub) => item[sub] === true)
      );
    }

    if (sortType === "Low-High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "High-Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [category, subCategory, sortType, Search, products]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter, ShowSearch, Search]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-6 pt-10 px-4 sm:px-10">
        {/* Sidebar Filters */}
        <div className="sm:w-1/4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden bg-gray-200 p-2 rounded-md w-full mb-4"
          >
            Toggle Filters
          </button>
          <div
            className={`${
              showFilter ? "block" : "hidden"
            } sm:block border p-4 rounded-md`}
          >
            <FilterSection
              title="CATEGORIES"
              options={["Common", "Rare", "Ultra-Rare"]}
              onToggle={(value) => handleToggle(value, setCategory)}
            />
            <FilterSection
              title="TYPE"
              options={["bestseller", "trusted"]}
              onToggle={(value) => handleToggle(value, setSubCategory)}
            />
          </div>
        </div>

        {/* Product List */}
        <div className="sm:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="Relevant">Sort by: Relevance</option>
              <option value="Low-High">Sort by: Low to High</option>
              <option value="High-Low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
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
      </div>
    </div>
  );
};

// Reusable Filter Component
const FilterSection = ({ title, options, onToggle }) => (
  <div>
    <p className="text-lg font-semibold mb-3">{title}</p>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={option}
            onChange={(e) => onToggle(e.target.value)}
          />{" "}
          {option.replace(/_/g, " ")}
        </label>
      ))}
    </div>
  </div>
);

export default AntiqueCollection;

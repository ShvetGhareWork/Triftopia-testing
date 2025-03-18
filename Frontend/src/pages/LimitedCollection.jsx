import React, { useContext, useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title.jsx";
import { motion } from "framer-motion";
import ProductItem from "../components/ProductItem.jsx";

const LimitedCollection = () => {
  const { products, Search, ShowSearch } = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("Relevant");

  const limitedProducts = products.filter(
    (item) => item.category === "Limited-Edition"
  );

  useEffect(() => {
    setFilteredProducts(limitedProducts);
  }, [products]);

  const handleToggle = (setter) => (e) => {
    const value = e.target.value;
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = useCallback(() => {
    let filtered = [...limitedProducts];

    if (Search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(Search.toLowerCase())
      );
    }

    if (category.length) {
      filtered = filtered.filter((item) => category.includes(item.rarityLevel));
    }

    if (subCategory.length) {
      filtered = filtered.filter((item) =>
        subCategory.some((sub) => item[sub] === true)
      );
    }

    if (sortType === "Low-High") filtered.sort((a, b) => a.price - b.price);
    if (sortType === "High-Low") filtered.sort((a, b) => b.price - a.price);

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
        <aside className="sm:w-1/4">
          <button
            onClick={() => setShowFilter(!ShowFilter)}
            className="sm:hidden bg-gray-200 p-2 rounded-md w-full mb-4"
          >
            Toggle Filters
          </button>
          <div
            className={`${
              ShowFilter ? "block" : "hidden"
            } sm:block border p-4 rounded-md`}
          >
            {/* Category Filter */}
            <p className="text-lg font-semibold mb-3">CATEGORIES</p>
            {["Common", "Rare", "Ultra-Rare"].map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={handleToggle(setCategory)}
                />{" "}
                {cat}
              </label>
            ))}

            {/* Subcategory Filter */}
            <p className="text-lg font-semibold mt-4 mb-3">TYPE</p>
            {["bestseller", "trusted"].map((sub) => (
              <label key={sub} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={sub}
                  onChange={handleToggle(setSubCategory)}
                />{" "}
                {sub}
              </label>
            ))}
          </div>
        </aside>

        {/* Product Display */}
        <main className="sm:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border p-2 rounded-md"
              value={sortType}
            >
              <option value="Relevant">Sort by: Relevance</option>
              <option value="Low-High">Sort by: Low to High</option>
              <option value="High-Low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
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
        </main>
      </div>
    </div>
  );
};

export default LimitedCollection;

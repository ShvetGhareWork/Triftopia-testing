import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, AddtoCart, isInCart } = useContext(ShopContext);
  const inCart = isInCart(id);

  return (
    <div className="text-gray-700 cursor-pointer flex flex-col items-center space-y-2">
      {/* Product Details */}
      <Link
        to={`/product/${id}`}
        className="block w-72 overflow-hidden rounded-2xl"
      >
        <img
          className="hover:scale-110 transition-transform ease-in-out w-full h-72 object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />
      </Link>

      <div className="text-center">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-lg font-medium">
          {currency}
          {price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={!inCart ? () => AddtoCart(id) : undefined}
        disabled={inCart}
        className={`bg-black text-white px-4 py-2 rounded-lg transition-colors duration-200 ${
          inCart ? "bg-gray-700 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
      >
        {inCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

// PropTypes for validation
ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProductItem;

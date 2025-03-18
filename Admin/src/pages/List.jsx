import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { backEndurl, currency } from "../App";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ProductList = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!token) return toast.error("Authorization token is missing!");

    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backEndurl}/api/product/list-product`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      data.success ? setList(data.products) : toast.error(data.message);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const deleteProduct = async (id) => {
    if (!id) return toast.error("Invalid product ID");

    try {
      const { data } = await axios.delete(
        `${backEndurl}/api/product/remove-product`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { id },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <p className="mb-2 mt-10 text-2xl text-black">All Products</p>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      ) : list.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-6 gap-4 items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
            <span>Image</span>
            <span className="col-span-2">Name</span>
            <span>Category</span>
            <span>Price ({currency})</span>
            <span className="text-center">Action</span>
          </div>
          {list.map(({ _id, image, name, category, price }) => (
            <div
              key={_id}
              className="md:grid grid-cols-6 gap-4 items-center py-2 px-4 border bg-gray-50 text-sm"
            >
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={image}
                alt={name}
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <span className="col-span-2">{name}</span>
              <span>{category}</span>
              <span>{price}</span>
              <button
                onClick={() => deleteProduct(_id)}
                className="text-red-500 hover:text-red-700 transition-all font-bold text-lg"
                aria-label={`Delete ${name}`}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;

ProductList.propTypes = {
  token: PropTypes.string.isRequired,
};

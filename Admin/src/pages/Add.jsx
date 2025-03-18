import React, { useState } from "react";
import Upload from "/upload.png";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    emi: "",
    category: "",
    subCategory: "",
    rarityLevel: "",
    bestseller: false,
    trusted: false,
    image: null,
  });
  const [preview, setPreview] = useState(Upload);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("value", "");
      data.append("reason", "");

      const response = await axios.post(
        `${backEndurl}/api/product/add-product`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          description: "",
          price: "",
          emi: "",
          category: "",
          subCategory: "",
          rarityLevel: "",
          bestseller: false,
          trusted: false,
          image: null,
        });
        setPreview(Upload);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  const categories = ["Antique", "Limited-Edition"];
  const subCategories = ["Collectables", "Exclusive Items"];
  const rarityLevels = ["Common", "Rare", "Ultra-Rare"];

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <h2 className="text-2xl text-black mt-10">Product Details:</h2>
      {[
        { label: "Product Name", type: "text", name: "name", required: true },
        {
          label: "Product Description",
          type: "textarea",
          name: "description",
          required: true,
        },
        {
          label: "Product Price",
          type: "number",
          name: "price",
          required: true,
        },
        {
          label: "Product EMI (24)",
          type: "number",
          name: "emi",
          required: true,
        },
      ].map(({ label, type, name, required }) => (
        <div className="w-full" key={name}>
          <p className="mb-2">{label}</p>
          {type === "textarea" ? (
            <textarea
              value={formData[name]}
              onChange={handleChange}
              name={name}
              placeholder={`Enter ${label}`}
              required={required}
              className="w-full max-w-[500px] px-3 py-2"
            />
          ) : (
            <input
              value={formData[name]}
              onChange={handleChange}
              type={type}
              name={name}
              placeholder={`Enter ${label}`}
              required={required}
              className="w-full max-w-[500px] px-3 py-2"
            />
          )}
        </div>
      ))}

      {/* Select Options */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Category", options: categories },
          { label: "SubCategory", options: subCategories },
          { label: "Rarity Level", options: rarityLevels },
        ].map(({ label, options }) => (
          <div key={label}>
            <p className="mb-2">Product {label}</p>
            <select
              value={formData[label.toLowerCase().replace(" ", "")]} // Fix casing
              name={label.toLowerCase().replace(" ", "")}
              onChange={handleChange}
              className="w-full px-3 py-2"
            >
              <option value="" disabled>
                Select {label}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Checkboxes */}
      {["bestseller", "trusted"].map((key) => (
        <div key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={key}
            name={key}
            checked={formData[key]}
            onChange={handleChange}
          />
          <label className="cursor-pointer" htmlFor={key}>
            Add to {key === "bestseller" ? "Best-Seller" : "Triftopia-Trusted"}
          </label>
        </div>
      ))}

      {/* Image Upload */}
      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="image" className="cursor-pointer">
          <img className="w-15 h-15 object-cover" src={preview} alt="Preview" />
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

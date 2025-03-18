import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
      trusted,
      originyear,
      brand,
      color,
      material,
      about,
      rarityLevel,
      condition,
    } = req.body;
    const image = req.file;

    if (!image)
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });

    // Upload image to Cloudinary
    const { secure_url: imageUrl } = await cloudinary.uploader.upload(
      image.path,
      { resource_type: "image" }
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      trusted: trusted === "true",
      date: Date.now(),
      originyear: Number(originyear),
      brand,
      color,
      material,
      about,
      rarityLevel,
      condition,
      image: imageUrl,
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully!",
      imageUrl,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products.length)
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product Removed!" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product info
const singleProductInfo = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product info:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProductInfo };

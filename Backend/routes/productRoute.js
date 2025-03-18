import express from "express";
import {
  addProduct,
  removeProduct,
  listProduct,
  singleProductInfo,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Admin Routes
productRouter.post(
  "/add-product",
  adminAuth,
  upload.single("image"), // Upload a single image
  addProduct
);
productRouter.delete("/remove-product", adminAuth, removeProduct);
productRouter.get("/list-product", adminAuth, listProduct); // Added admin authentication

// Public Routes
productRouter.get("/product-info", singleProductInfo);

export default productRouter;

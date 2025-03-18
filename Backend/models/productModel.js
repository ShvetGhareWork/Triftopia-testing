import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    bestseller: { type: Boolean, required: true },
    trusted: { type: Boolean, required: true },
    rarityLevel: { type: String, required: true },
    date: { type: Number },
    brand: { type: String },
    color: { type: String },
    material: { type: String },
    about: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

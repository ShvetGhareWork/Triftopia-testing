import express from "express";
import {
  AllOrders,
  PlaceOrder,
  PlaceOrderRazorpay,
  UpdateStatus,
  UserOrders,
  verifyRazorpay,
} from "../controllers/OrderController.js";
import AdminAuth from "../middleware/adminAuth.js";
import AuthUser from "../middleware/Auth.js";

const OrderRouter = express.Router();

// Admin Routes
OrderRouter.post("/list", AdminAuth, AllOrders); // Fetch all orders
OrderRouter.post("/status", AdminAuth, UpdateStatus); // Update order status

// User Routes
OrderRouter.post("/place", AuthUser, PlaceOrder); // Place order (COD)
OrderRouter.post("/razorpay", AuthUser, PlaceOrderRazorpay); // Place order (Razorpay)
OrderRouter.post("/userorders", AuthUser, UserOrders); // Fetch user’s orders
OrderRouter.post("/verifyrazorpay", AuthUser, verifyRazorpay); // Verify Razorpay payment

export default OrderRouter;

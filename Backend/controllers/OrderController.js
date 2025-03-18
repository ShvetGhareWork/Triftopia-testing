import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

// Global constants
const CURRENCY = "INR";
const DELIVERY_CHARGE = 10;

// Razorpay initialization
const RazorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper function to clear user's cart
const clearUserCart = async (userId) => {
  await userModel.findByIdAndUpdate(userId, { cartdata: {} });
};

// Place COD Order
const PlaceOrder = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body;
    if (!userId || !amount || !items.length || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
      payment_method: "COD",
      payment: false,
      date: new Date(),
    });

    await clearUserCart(userId);
    res.json({ success: true, message: "Order Placed", order: newOrder });
  } catch (error) {
    console.error("Error in PlaceOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Razorpay Order
const PlaceOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId || !amount || !items.length || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      payment_method: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    const options = {
      amount: amount * 100,
      currency: CURRENCY,
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await RazorpayInstance.orders.create(options);
    res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.error("Error in PlaceOrderRazorpay:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await clearUserCart(userId);
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error("Error in verifyRazorpay:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch All Orders (Admin)
const AllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch User's Orders
const UserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userOrders = await orderModel.find({ userId });
    res.json({ success: true, userOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status (Admin)
const UpdateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  PlaceOrder,
  PlaceOrderRazorpay,
  verifyRazorpay,
  AllOrders,
  UserOrders,
  UpdateStatus,
};

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import CartRouter from "./routes/CartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import AuthUser from "./middleware/Auth.js";

// App config
const app = express();
const port = process.env.PORT || 7777;

// Initialize DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "https://triftopia-testing-frontend.vercel.app",
  "https://triftopia-testing-admin.vercel.app",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order", OrderRouter);

// Health check
app.get("/", (req, res) => res.send("API WORKING"));

// Protected route
app.get("/protected", AuthUser, (req, res) => {
  console.log("User ID in Route Handler:", req.userId);
  res.json({ success: true, userId: req.userId });
});

// Start the server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));

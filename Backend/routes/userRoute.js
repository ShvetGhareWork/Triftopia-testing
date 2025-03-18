import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Admin Routes
userRouter.post("/admin", adminLogin);

export default userRouter;

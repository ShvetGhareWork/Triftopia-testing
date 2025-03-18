import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const SECRET_KEY = process.env.JWT_SECRET || "default_value";
const createToken = (id) => jwt.sign({ id }, SECRET_KEY);

const handleResponse = (res, success, message, extra = {}) =>
  res.json({ success, message, ...extra });

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return handleResponse(res, false, "User doesn't exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleResponse(res, false, "Incorrect credentials");

    const token = createToken(user._id);
    handleResponse(res, true, "Login successful", { token, userId: user._id });
  } catch (error) {
    console.error(error);
    handleResponse(res, false, error.message);
  }
};

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await userModel.findOne({ email })) {
      return handleResponse(res, false, "User already exists");
    }

    if (!validator.isEmail(email)) {
      return handleResponse(res, false, "Please enter a valid Email");
    }

    if (password.length < 8) {
      return handleResponse(res, false, "Please enter a strong password");
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    const token = createToken(user._id);

    handleResponse(res, true, "User registered successfully", { token });
  } catch (error) {
    console.error(error);
    handleResponse(res, false, error.message);
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, SECRET_KEY);
      handleResponse(res, true, "Admin login successful", { token });
    } else {
      handleResponse(res, false, "Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    handleResponse(res, false, error.message);
  }
};

export { loginUser, registerUser, adminLogin };

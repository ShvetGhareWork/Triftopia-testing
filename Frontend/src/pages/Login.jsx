import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { token, setToken, navigate, backEndURL } = useContext(ShopContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";
    const payload =
      currentState === "Sign Up"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(backEndURL + endpoint, payload);
      const { success, message, token: userToken, userId } = response.data;

      if (success) {
        setToken(userToken);
        localStorage.setItem("token", userToken);
        if (userId) localStorage.setItem("userId", userId);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] pb-30 sm:max-w-96 m-auto gap-4 text-gray-800"
      >
        {/* Title */}
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Input Fields */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-800"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-800"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-800"
        />

        {/* Action Links */}
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password?</p>
          <p
            className="cursor-pointer"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
          >
            {currentState === "Login" ? "Create Account" : "Login Here"}
          </p>
        </div>

        {/* Submit Button */}
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Sign Up" ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <Footer />
    </>
  );
};

export default Login;

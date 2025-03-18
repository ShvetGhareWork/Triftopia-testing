import React, { useState } from "react";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const API_BASE_URL = backEndurl || "http://localhost:7777";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/user/admin`,
        formData
      );
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const renderInput = (label, name, type = "text") => (
    <div className="mb-3 min-w-72">
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <input
        onChange={handleChange}
        value={formData[name]}
        name={name}
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        required
        className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          {renderInput("Email Address", "email", "email")}
          {renderInput("Password", "password", "password")}
          <button
            type="submit"
            className="bg-black text-white mt-2 w-full py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

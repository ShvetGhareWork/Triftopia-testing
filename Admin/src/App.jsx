import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./components/Login.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ensure .env contains: VITE_BACKEND_URL=https://localhost:7777
export const backEndurl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

// Helper function to manage token
const getTokenFromStorage = () => localStorage.getItem("token") || "";

const App = () => {
  const [token, setToken] = useState(getTokenFromStorage);

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);

  const routes = useMemo(
    () => (
      <Routes>
        <Route path="/add-product" element={<Add token={token} />} />
        <Route path="/list-product" element={<List token={token} />} />
        <Route path="/orders" element={<Orders token={token} />} />
      </Routes>
    ),
    [token]
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token ? (
        <div>
          <Navbar setToken={setToken} />
          <hr />
          <div className="w-full flex">
            <Sidebar />
            <div className="w-[70%] max-h-auto ml-[max(5vw, 25px)] text-gray-600 text-base">
              {routes}
            </div>
          </div>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;

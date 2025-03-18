import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backEndURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [Search, SetSearch] = useState("");
  const [ShowSearch, SetShowSearch] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [CartItems, SetCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      return {};
    }
  });
  const [Product, setProduct] = useState([]);

  // Update localStorage whenever CartItems change
  useEffect(
    () => localStorage.setItem("cart", JSON.stringify(CartItems)),
    [CartItems]
  );

  // Fetch product data
  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.get(
          `${backEndURL}/api/product/list-product`,
          { headers: { token } }
        );
        if (response.data.success) setProduct(response.data.products);
        else toast.error(response.data.message);
      } catch (error) {
        toast.error("Error fetching products: " + error.message);
      }
    };
    getProductData();
  }, [token]);

  // Fetch cart data on login
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (token && userId) FetchCartData(userId);
  }, [token]);

  const FetchCartData = async (userId) => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/cart/getcart`,
        { userId },
        { headers: { token } }
      );
      if (response.data.success)
        SetCartItems(mapCartData(response.data.cartItems));
      else console.error("Failed to fetch cart items:", response.data.message);
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    }
  };

  const mapCartData = (cartItems) =>
    cartItems.reduce((acc, item) => {
      acc[item.itemId] = { quantity: item.quantity, ...item };
      return acc;
    }, {});

  const syncCartWithBackend = async (itemId, quantity) => {
    if (!token) return;
    const product = Product.find((p) => p._id === itemId);
    try {
      await axios.post(
        `${backEndURL}/api/cart/update`,
        { itemId, quantity, ...product },
        { headers: { token } }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart.");
    }
  };

  const updateCart = (itemId, quantity) => {
    SetCartItems((prev) => {
      const updatedCart = { ...prev };
      if (quantity <= 0) delete updatedCart[itemId];
      else
        updatedCart[itemId] = {
          ...Product.find((p) => p._id === itemId),
          quantity,
        };
      syncCartWithBackend(itemId, quantity);
      return updatedCart;
    });
  };

  const AddtoCart = (itemId) =>
    updateCart(itemId, (CartItems[itemId]?.quantity || 0) + 1);
  const removeFromCart = (itemId) => updateCart(itemId, 0);
  const updateQuantity = (itemId, quantity) => updateCart(itemId, quantity);

  const isInCart = (itemId) => !!CartItems[itemId];
  const GetcartCount = () =>
    Object.values(CartItems).reduce((acc, item) => acc + item.quantity, 0);
  const getCartAmount = () =>
    Object.values(CartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const value = {
    products: Product,
    currency,
    delivery_fee,
    Search,
    SetSearch,
    ShowSearch,
    SetShowSearch,
    CartItems,
    SetCartItems,
    AddtoCart,
    GetcartCount,
    updateQuantity,
    removeFromCart,
    getCartAmount,
    isInCart,
    navigate,
    backEndURL,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

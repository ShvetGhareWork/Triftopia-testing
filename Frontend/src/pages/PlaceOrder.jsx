import React, { useContext, useState } from "react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartTotal from "../components/CartTotal";
import Stripe from "/stripe.png";
import Razorpay from "/razorpay.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backEndURL,
    token,
    SetCartItems,
    CartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const orderItems = Object.entries(CartItems).reduce(
    (acc, [itemId, cartItem]) => {
      const quantity = cartItem?.quantity ?? 0;
      if (quantity > 0) {
        const itemInfo = products.find(
          (product) => product._id?.toString() === itemId.toString()
        );
        if (itemInfo) acc.push({ ...structuredClone(itemInfo), quantity });
      }
      return acc;
    },
    []
  );

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backEndURL}/api/order/verifyrazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            SetCartItems({});
            navigate("/orders");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };
    new window.Razorpay(options).open();
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const OrderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
      payment_method: method,
    };

    try {
      const endpoint =
        method === "cod" ? "/api/order/place" : "/api/order/razorpay";
      const { data } = await axios.post(`${backEndURL}${endpoint}`, OrderData, {
        headers: { token },
      });
      if (data.success) {
        method === "razorpay"
          ? initPay(data.order)
          : (SetCartItems({}), navigate("/orders"));
      } else toast.error(data.message);
    } catch (error) {
      console.error("Error in HandleSubmit:", error.message);
      toast.error(error.message);
    }
  };

  const renderInput = (name, placeholder, type = "text") => (
    <input
      required
      onChange={onChangeHandler}
      name={name}
      value={formData[name]}
      placeholder={placeholder}
      className="border border-gray-300 rounded py-2 px-3 w-full"
      type={type}
    />
  );

  const paymentMethods = [
    { id: "stripe", img: Stripe },
    { id: "razorpay", img: Razorpay },
    { id: "cod", label: "Cash on Delivery" },
  ];

  return (
    <>
      <Navbar />
      <form
        onSubmit={HandleSubmit}
        className="flex flex-col sm:flex-row justify-between gap-6 p-4 sm:p-10 min-h-[80vh] border-t"
      >
        {/* Delivery Information */}
        <div className="flex flex-col gap-4 sm:w-1/2 w-full">
          <Title text1="DELIVERY" text2="INFORMATION" />
          <div className="flex flex-col sm:flex-row gap-3">
            {renderInput("firstName", "First Name")}{" "}
            {renderInput("lastName", "Last Name")}
          </div>
          {renderInput("email", "Email Address", "email")}
          {renderInput("street", "Street")}
          <div className="flex flex-col sm:flex-row gap-3">
            {renderInput("city", "City")} {renderInput("state", "State")}
          </div>
          {renderInput("zipcode", "Zipcode")}
          {renderInput("country", "Country")}
          {renderInput("phone", "Phone", "number")}
        </div>

        {/* Payment Information */}
        <div className="sm:w-1/2 w-full mt-6 sm:mt-0">
          <CartTotal />
          <div className="mt-7">
            <Title text1="PAYMENT" text2="METHOD" />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {paymentMethods.map(({ id, img, label }) => (
                <div
                  key={id}
                  onClick={() => setMethod(id)}
                  className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded transition-all duration-200 ${
                    method === id
                      ? "bg-gray-200 ring-2 ring-black border-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {img ? (
                    <img src={img} className="h-5 mx-4" alt={id} />
                  ) : (
                    <span className="h-5 mx-4 mb-2 text-lg">{label}</span>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 w-full sm:w-auto mt-8"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PlaceOrder;

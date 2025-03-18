import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Footer from "../components/Footer";
import axios from "axios";

const Orders = () => {
  const { backEndURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const LoadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backEndURL}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrderItems = response.data.userOrders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            payment_method: order.payment_method ?? "undefined",
            date: order.date,
          }))
        );
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    LoadOrderData();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="border-t ml-20 mr-20 pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>

        <div>
          {orderData.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No orders found.</p>
          ) : (
            orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b-0 text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Order Details */}
                <div className="flex items-start gap-6 text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p className="text-lg">
                        Price: {currency} {item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="mt-1">
                      Date:{" "}
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="mt-1">
                      Payment:{" "}
                      <span className="text-gray-400">
                        {item.payment_method}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Status and Track Button */}
                <div className="md:w-1/2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={LoadOrderData}
                    className="border mr-5 px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;

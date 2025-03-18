import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { backEndurl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const FetchAllOrders = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backEndurl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [token]);

  const StatusHandler = async (event, orderId) => {
    try {
      const { data } = await axios.post(
        `${backEndurl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) FetchAllOrders();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    FetchAllOrders();
  }, [FetchAllOrders]);

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Order Page</h3>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders available.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="w-full bg-white shadow-md p-6 rounded-xl border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  className="w-14 h-14 mr-4"
                  src="/placeholder.png"
                  alt="Order"
                />
                <div>
                  <p className="text-lg font-semibold mb-1">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity}
                        {i < order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {order.address.phone}
                  </p>
                  <p className="text-sm text-gray-500">
                    Method: {order.payment_method}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.payment ? "Done" : "Pending"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold mb-4 text-gray-800">
                  {currency} {order.amount}
                </p>
                <select
                  onChange={(event) => StatusHandler(event, order._id)}
                  value={order.status}
                  className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-semibold"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

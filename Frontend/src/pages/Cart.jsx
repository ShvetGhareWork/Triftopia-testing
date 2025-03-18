import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Bin from "/bin.png";
import Navbar from "../components/Navbar";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer.jsx";

const Cart = () => {
  const { currency, CartItems, removeFromCart, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = Object.entries(CartItems).map(([itemId, item]) => ({
      _id: itemId,
      quantity: item.quantity,
      name: item.name || "Unknown Product",
      image: item.image || "/default-image.png",
      price: item.price || 0,
    }));
    setCartData(tempData);
  }, [CartItems]);

  const currentDate = new Date().toLocaleString();

  return (
    <>
      <Navbar />
      <div className="pt-10">
        <div className="text-2xl mb-3 text-center">
          <Title text1="YOUR" text2="CART" />
        </div>

        {/* Cart Items */}
        <div>
          {cartData.length === 0 ? (
            <div className="text-center">Your cart is empty.</div>
          ) : (
            cartData.map((item) => (
              <div
                key={item._id}
                className="py-4 border-t border-b-0 text-gray-700 flex justify-between items-center"
              >
                {/* Product Details */}
                <div className="flex items-start gap-6">
                  <img
                    src={item.image}
                    className="w-16 ml-4 sm:w-20"
                    alt={item.name}
                  />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{item.name}</p>
                    <div className="flex items-center justify-between space-x-4">
                      <p className="text-lg font-semibold sm:text-md">
                        Price: {currency}
                        {new Intl.NumberFormat().format(item.price)}
                      </p>
                      <p className="text-lg font-semibold sm:text-md">
                        Time: {currentDate}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg pr-5 font-semibold sm:text-md">
                        Quantity:
                      </p>
                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || value === "0" || isNaN(value))
                            return;
                          updateQuantity(item._id, Number(value));
                        }}
                        className="border border-gray-400 w-20 h-10 px-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <img
                  src={Bin}
                  className="w-auto mr-4 cursor-pointer"
                  alt="Remove"
                  onClick={() => removeFromCart(item._id)}
                />
              </div>
            ))
          )}
        </div>

        <hr className="my-6" />

        {/* Cart Total and Checkout */}
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

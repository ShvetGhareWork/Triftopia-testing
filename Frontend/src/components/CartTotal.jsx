import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Calculate totals
  const totalAmount = getCartAmount() || 0;
  const finalTotal = totalAmount > 0 ? totalAmount + delivery_fee : 0;

  // Format currency display
  const formatCurrency = (amount) => `${currency} ${amount.toFixed(2)}`;

  // Data for rendering rows to avoid repetition
  const cartDetails = [
    { label: "SUB TOTAL:", value: formatCurrency(totalAmount) },
    {
      label: "SHIPPING FEE:",
      value: formatCurrency(totalAmount > 0 ? delivery_fee : 0),
    },
    { label: "TOTAL:", value: formatCurrency(finalTotal), isBold: true },
  ];

  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      {/* Cart Details */}
      <div className="flex flex-col gap-2 mt-2 text-sm pr-10">
        {cartDetails.map(({ label, value, isBold }, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-between">
              <p className={isBold ? "font-bold" : "font-semibold"}>{label}</p>
              <p className={isBold ? "font-bold" : ""}>{value}</p>
            </div>
            {index < cartDetails.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CartTotal;

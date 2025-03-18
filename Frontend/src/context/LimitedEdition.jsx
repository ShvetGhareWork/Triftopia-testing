import { useContext, useMemo } from "react";
import { ShopContext } from "./ShopContext";

const LimitedEdition = () => {
  const { products } = useContext(ShopContext);

  // Optimize with useMemo to avoid unnecessary re-renders
  const limitedEditionItems = useMemo(
    () => products.filter((item) => item.category === "Limited-Edition"),
    [products]
  );

  return (
    <div>
      {limitedEditionItems.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
};

export default LimitedEdition;

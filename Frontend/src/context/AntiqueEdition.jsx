import { useContext, useMemo } from "react";
import { ShopContext } from "./ShopContext";

const AntiqueEdition = () => {
  const { products } = useContext(ShopContext);

  // Optimize with useMemo to avoid unnecessary re-renders
  const antiqueEditionItems = useMemo(
    () => products.filter((item) => item.category === "Antique"),
    [products]
  );

  return (
    <div>
      {antiqueEditionItems.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
};

export default AntiqueEdition;

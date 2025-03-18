import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Star from "/star.png";
import Navbar from "../components/Navbar";
import RelatedProducts from "../components/RelatedProducts";

const LEProduct = () => {
  const { products, currency, AddtoCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const data = products.find((item) => item._id === productId);
      if (data) setProductData(data);
      else console.error(`Product with ID ${productId} not found.`);
    }
  }, [products, productId]);

  if (!productData) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading product details...
      </div>
    );
  }

  const {
    name,
    image,
    price,
    Emi,
    description,
    category,
    subcategory,
    condition,
    rarity_level,
  } = productData;

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              <button className="w-20 h-20 border rounded-lg overflow-hidden">
                <img src={image} alt="Product Thumbnail" />
              </button>
            </div>
            {/* Main Image */}
            <div className="flex-1 sticky top-0 hover:scale-110 transition duration-500">
              <img src={image} className="rounded-lg" alt="Product" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6 pl-10">
            <h1 className="font-medium text-3xl">{name}</h1>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={Star} alt="Star" className="w-3.5" />
              ))}
              <p className="text-gray-600 pl-2">(122)</p>
            </div>
            <p className="text-3xl font-semibold">
              {currency} {price}
            </p>
            {Emi && (
              <p className="text-xl">
                EMI: {currency} {Emi} Valid up to 24 months!
              </p>
            )}
            <button
              onClick={() => AddtoCart(productId)}
              className="bg-black w-40 text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr />
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>✅ 100% Original Product.</p>
              <p>✅ Cash on Delivery is Available.</p>
              <p>✅ Easy exchange and return policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* Description & Reviews Section */}
        <div className="mt-20 mx-24">
          <div className="flex">
            <b className="border px-5 py-3 text-lg">DESCRIPTION</b>
            <b className="border px-5 py-3 text-lg">REVIEWS (122)</b>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-lg text-gray-500">
            <p>{description}</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="w-full">
          <RelatedProducts
            category={category}
            subcategory={subcategory}
            condition={condition}
            rarity_level={rarity_level}
          />
        </div>
      </div>
    </>
  );
};

export default LEProduct;

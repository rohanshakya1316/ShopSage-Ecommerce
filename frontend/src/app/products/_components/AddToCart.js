"use client";

import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartStore.getState();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart successfully!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-hover active:scale-95 transition-all"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;

"use client";

import useCartStore from "@/stores/cartStore";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartStore.getState();

  function handleAddToCart() {
    addToCart(product);
    toast.success("Added to cart successfully!");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 cursor-pointer bg-primary text-white py-2.5 px-4 rounded-full text-sm font-medium transition duration-300 ease hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
    >
      Add to Cart
      <FaShoppingCart className="w-4 h-4" />
    </button>
  );
};

export default AddToCart;

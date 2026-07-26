"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useCartStore from "@/stores/cartStore";
import { createOrder } from "@/api/orders";
import { ORDER_ROUTE } from "@/constants/routes";

export default function CheckoutButton({ shippingAddress }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { items, clearCart } = useCartStore.getState();

  async function handleCheckout() {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!shippingAddress?.city) {
      toast.error("Please provide a shipping address.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        orderItems: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress,
      };

      const order = await createOrder(orderPayload);
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`${ORDER_ROUTE}/${order._id}`);
    } catch (err) {
      toast.error(err?.response?.data || "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-primary text-white font-medium py-3 rounded-full hover:bg-primary-hover disabled:opacity-50 transition-all"
    >
      {loading ? "Placing order…" : "Place Order"}
    </button>
  );
}

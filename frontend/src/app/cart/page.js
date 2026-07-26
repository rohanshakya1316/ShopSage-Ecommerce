"use client";

import { useState } from "react";
import Link from "next/link";
import useCartStore from "@/stores/cartStore";
import CartItemRow from "./_components/CartItemRow";
import CheckoutButton from "./_components/CheckoutButton";
import { PRODUCT_ROUTE } from "@/constants/routes";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [address, setAddress] = useState({
    city: "",
    province: "",
    street: "",
    country: "Nepal",
  });

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-muted mb-4">Your cart is empty.</p>
        <Link
          href={PRODUCT_ROUTE}
          className="text-primary font-medium hover:underline"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">Your Cart</h1>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        {items.map((item) => (
          <CartItemRow key={item._id} item={item} />
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-heading mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Province"
            value={address.province}
            onChange={(e) =>
              setAddress({ ...address, province: e.target.value })
            }
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted">Total</span>
          <span className="text-2xl font-bold text-primary">
            Rs. {getTotalPrice().toLocaleString()}
          </span>
        </div>
        <CheckoutButton shippingAddress={address} />
      </div>
    </div>
  );
}

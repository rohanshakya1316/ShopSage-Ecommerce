"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/api/orders";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrderById(id)
      .then(setOrder)
      .catch((err) => setError(err?.response?.data || "Failed to load order."));
  }, [id]);

  if (error) return <p className="text-error text-center py-16">{error}</p>;
  if (!order) return <p className="text-muted text-center py-16">Loading…</p>;

  return (
    <div className="border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-heading">
          Order {order.orderNumber}
        </h2>
        <span className="text-xs font-medium px-2 py-1 rounded-full capitalize bg-slate-100 text-slate-700">
          {order.status}
        </span>
      </div>
      <p className="text-muted text-sm mb-6">
        Placed on {new Date(order.createdDate).toLocaleDateString()}
      </p>

      <div className="divide-y divide-slate-100 mb-6">
        {order.orderItems.map((item, i) => (
          <div
            key={item.product?._id || i}
            className="flex items-center gap-4 py-3"
          >
            <img
              src={item.product?.imageUrls?.[0] || "/placeholder.png"}
              alt={item.product?.name || "Product"}
              className="h-14 w-14 rounded-lg object-cover border border-slate-200"
            />
            <div className="flex-1">
              <p className="font-medium text-heading">
                {item.product?.name || "Product unavailable"}
              </p>
              <p className="text-muted text-sm">Qty: {item.quantity}</p>
            </div>
            {item.product?.price && (
              <p className="font-semibold text-heading">
                Rs. {(item.product.price * item.quantity).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 text-sm text-body">
        <p className="font-semibold text-heading mb-1">Shipping Address</p>
        <p>
          {order.shippingAddress?.street}, {order.shippingAddress?.city}
        </p>
        <p>
          {order.shippingAddress?.province}, {order.shippingAddress?.country}
        </p>
      </div>

      <div className="flex justify-between border-t border-slate-200 pt-4">
        <span className="font-bold text-heading">Total</span>
        <span className="font-bold text-primary">
          Rs. {order.totalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

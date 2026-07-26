"use client";

import useCartStore from "@/stores/cartStore";
import { Trash2, Minus, Plus } from "lucide-react";

export default function CartItemRow({ item }) {
  const { updateQuantity, removeFromCart } = useCartStore.getState();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-b-0">
      <img
        src={item.imageUrls?.[0] || "/placeholder.png"}
        alt={item.name}
        className="h-16 w-16 rounded-lg object-cover border border-slate-200 shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="font-medium text-heading truncate">{item.name}</p>
        <p className="text-sm text-muted">Rs. {item.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2 border border-slate-200 rounded-full px-2 py-1 shrink-0">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="text-body hover:text-heading disabled:opacity-30"
          disabled={item.quantity <= 1}
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-medium w-6 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="text-body hover:text-heading"
        >
          <Plus size={14} />
        </button>
      </div>

      <p className="font-semibold text-heading w-24 text-right shrink-0">
        Rs. {(item.price * item.quantity).toLocaleString()}
      </p>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-error hover:opacity-70 shrink-0"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

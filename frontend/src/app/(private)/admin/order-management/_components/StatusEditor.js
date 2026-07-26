"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { updateOrderStatus } from "@/api/orders";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
} from "@/constants/orderStatus";

const statusOptions = [
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
];

export default function StatusEditor({ order, onUpdated, openUpward }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleChange(newStatus) {
    if (newStatus === order.status) {
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const updated = await updateOrderStatus(order._id, newStatus);
      onUpdated(updated);
      toast.success("Order status updated.");
    } catch (err) {
      toast.error(err?.response?.data || "Failed to update status.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        className="text-primary hover:text-primary-hover disabled:opacity-50"
      >
        <Pencil size={16} />
      </button>

      {open && (
        <>
          {/* Click-outside overlay to close the dropdown */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className={`absolute right-0 z-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-36 ${
              openUpward ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleChange(status)}
                className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                  status === order.status ? "text-primary" : "text-body"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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

const EditOrderStatus = ({ order, onUpdated, openUpward }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const lockedStatuses = [
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_SHIPPED,
  ];

  const handleChange = async (newStatus) => {
    // Prevent updating already processed orders
    if (lockedStatuses.includes(order.status)) {
      toast.error(`Order status cannot be changed after ${order.status}.`);
      setOpen(false);
      return;
    }

    if (newStatus === order.status) {
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const updated = await updateOrderStatus(order._id, newStatus);
      onUpdated(updated);
      toast.success("Order status updated.");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to update status.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
};

export default EditOrderStatus;

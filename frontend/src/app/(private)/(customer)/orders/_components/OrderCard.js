"use client";

import { CalendarDays, CreditCard, Truck, Eye, XCircle } from "lucide-react";

import OrderProduct from "./OrderProduct";
import OrderStatusBadge from "./OrderStatusBadge";
import { format } from "date-fns";
import { cancelOrder } from "@/api/orders";
import { toast } from "react-toastify";
import { useState } from "react";
import { ORDER_CANCELLED, ORDER_PENDING } from "@/constants/orderStatus";

const OrderCard = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState([ORDER_PENDING]);
  const handleCancelOrder = (orderId) => {
    if (confirm("Are you sure to cancel order?")) {
      cancelOrder(orderId)
        .then(() => {
          toast.info("Order Cancelled.");
          setOrderStatus((prev) =>
            prev.map((order) =>
              order._id === orderId ? { ...order, status: ORDER_CANCELLED } : order,
            ),
          );
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="bg-card rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}

      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-heading">{order._id}</h2>

            <div className="flex items-center gap-2 mt-2 text-body text-sm">
              <CalendarDays size={16} />

              <span>{format(order.createdDate, "dd MMM yyyy")}</span>
            </div>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Products */}

      <div className="divide-y divide-gray-200">
        {order.orderItems.map((item) => (
          <OrderProduct key={item._id} item={item} />
        ))}
      </div>

      {/* Footer */}

      <div className="bg-background p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment */}

          <div>
            <h4 className="font-semibold text-heading mb-3">Payment</h4>

            <div className="flex items-center gap-2 text-body">
              <CreditCard size={18} />

              {order?.payment}
            </div>
          </div>

          {/* Shipping */}

          <div>
            <h4 className="font-semibold text-heading mb-3">Shipping</h4>

            <div className="flex items-center gap-2 text-body">
              <Truck size={18} />

              {order.shippingAddress.city}
            </div>
          </div>

          {/* Total */}

          <div className="lg:text-right">
            <h4 className="font-semibold text-heading">Order Total</h4>

            <p className="text-2xl font-bold text-primary mt-2">
              Rs. {order.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-white font-semibold hover:bg-primary-hover transition-all">
            <Eye size={20} />
            View Details
          </button>

          {order.status === ORDER_PENDING && (
            <button
              onClick={() => handleCancelOrder(order._id)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-error py-3 text-error font-semibold hover:bg-error hover:text-white transition-all"
            >
              <XCircle size={20} />
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

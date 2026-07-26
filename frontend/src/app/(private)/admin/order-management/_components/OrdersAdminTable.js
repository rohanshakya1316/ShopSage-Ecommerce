"use client";

import { useState } from "react";
import StatusEditor from "./StatusEditor";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
} from "@/constants/orderStatus";

const statusStyles = {
  [ORDER_STATUS_PENDING]: "border-amber-300 text-amber-700 bg-amber-50",
  [ORDER_STATUS_CONFIRMED]: "border-blue-300 text-blue-700 bg-blue-50",
  [ORDER_STATUS_SHIPPED]: "border-purple-300 text-purple-700 bg-purple-50",
  [ORDER_STATUS_DELIVERED]: "border-green-300 text-green-700 bg-green-50",
  [ORDER_STATUS_CANCELLED]: "border-red-300 text-red-700 bg-red-50",
};

export default function OrdersAdminTable({ orders }) {
  const [localOrders, setLocalOrders] = useState(orders);

  function handleUpdated(updatedOrder) {
    setLocalOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-visible">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide w-12">
              S.N
            </th>
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide">
              Order Number
            </th>
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide">
              Product
            </th>
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide">
              Customer
            </th>
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide">
              Total Price
            </th>
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 font-medium text-xs uppercase tracking-wide">
              Created At
            </th>
            <th className="px-4 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {localOrders.map((order, index) => (
            <tr key={order._id} className="border-b border-slate-100 align-top">
              <td className="px-4 py-4 text-muted">{index + 1}</td>

              <td className="px-4 py-4">
                <span className="text-error font-mono text-xs break-all">
                  {order.orderNumber}
                </span>
              </td>

              <td className="px-4 py-4">
                <div className="flex flex-col gap-3">
                  {order.orderItems.map((item, i) => (
                    <div
                      key={item.product?._id || i}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.product?.imageUrls?.[0] || "/placeholder.png"}
                        alt={item.product?.name || "Product"}
                        className="h-10 w-10 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <p className="font-medium text-heading">
                          {item.product?.name || "Product unavailable"}
                        </p>
                        <p className="text-xs text-muted">
                          {[item.product?.category, item.product?.brand]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>

              <td className="px-4 py-4">
                <p className="font-medium text-heading">
                  {order.user?.name || "Customer user"}
                </p>
                <p className="text-xs text-muted">{order.user?.email}</p>
                <p className="text-xs text-muted">{order.user?.phone}</p>
              </td>

              <td className="px-4 py-4 font-medium text-heading whitespace-nowrap">
                Rs. {order.totalPrice.toLocaleString()}
              </td>

              <td className="px-4 py-4">
                <span
                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${
                    statusStyles[order.status] ||
                    "border-slate-300 text-slate-700 bg-slate-50"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-4 py-4 text-muted whitespace-nowrap">
                {new Date(order.createdDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              <td className="px-4 py-4">
                <StatusEditor
                  order={order}
                  onUpdated={handleUpdated}
                  openUpward={index >= localOrders.length - 2}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { cancelOrder, confirmOrder } from "@/api/orders";
// import { PRODUCT_ROUTE } from "@/constants/routes";

// const statusStyles = {
//   pending: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
//   confirmed: "bg-blue-100 text-blue-800 ring-1 ring-blue-200",
//   shipped: "bg-purple-100 text-purple-800 ring-1 ring-purple-200",
//   delivered: "bg-green-100 text-green-800 ring-1 ring-green-200",
//   cancelled: "bg-red-100 text-red-800 ring-1 ring-red-200",
// };

// export default function OrderTable({ orders }) {
//   const [localOrders, setLocalOrders] = useState(orders);
//   const [loadingId, setLoadingId] = useState(null);

//   async function handleCancel(orderId) {
//     setLoadingId(orderId);
//     try {
//       const updated = await cancelOrder(orderId);
//       setLocalOrders((prev) =>
//         prev.map((o) => (o._id === orderId ? updated : o)),
//       );
//       toast.success("Order cancelled.");
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to cancel order.");
//     } finally {
//       setLoadingId(null);
//     }
//   }

//   async function handleConfirmPayment(orderId) {
//     setLoadingId(orderId);
//     try {
//       const updated = await confirmOrder(orderId, "confirmed");
//       setLocalOrders((prev) =>
//         prev.map((o) => (o._id === orderId ? updated : o)),
//       );
//       toast.success("Payment confirmed.");
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to confirm payment.");
//     } finally {
//       setLoadingId(null);
//     }
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       {localOrders.map((order) => (
//         <div
//           key={order._id}
//           className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
//         >
//           {/* Header strip — grid keeps columns aligned across every card */}
//           <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 grid grid-cols-[100px_140px_1fr_140px_auto] items-center gap-4">
//             <div>
//               <p className="text-[11px] uppercase tracking-wide text-muted mb-1">
//                 Status
//               </p>
//               <span
//                 className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${
//                   statusStyles[order.status] ||
//                   "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </div>

//             <div>
//               <p className="text-[11px] uppercase tracking-wide text-muted mb-1">
//                 Date Placed
//               </p>
//               <p className="text-sm text-heading font-medium">
//                 {new Date(order.createdDate).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </p>
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] uppercase tracking-wide text-muted mb-1">
//                 Order Number
//               </p>
//               <p className="text-sm text-heading font-mono truncate">
//                 {order.orderNumber}
//               </p>
//             </div>

//             <div>
//               <p className="text-[11px] uppercase tracking-wide text-muted mb-1">
//                 Total amount
//               </p>
//               <p className="text-sm font-bold text-primary">
//                 Rs. {order.totalPrice.toLocaleString()}
//               </p>
//             </div>

//             {order.status === "pending" && (
//               <div className="flex items-center gap-3 justify-end">
//                 <button
//                   onClick={() => handleCancel(order._id)}
//                   disabled={loadingId === order._id}
//                   className="bg-error text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50 transition shadow-sm whitespace-nowrap"
//                 >
//                   {loadingId === order._id ? "Cancelling…" : "Cancel order"}
//                 </button>
//                 <button
//                   onClick={() => handleConfirmPayment(order._id)}
//                   disabled={loadingId === order._id}
//                   className="border border-primary text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white disabled:opacity-50 transition whitespace-nowrap"
//                 >
//                   Confirm payment
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Product header row — same grid template as the rows below */}
//           <div className="grid grid-cols-[1fr_140px_140px_100px] px-6 pt-4 pb-2 text-muted text-xs uppercase tracking-wide font-medium">
//             <div>Product</div>
//             <div>Qty</div>
//             <div>Price</div>
//             <div>Action</div>
//           </div>

//           {/* Product rows */}
//           <div>
//             {order.orderItems.map((item, i) => (
//               <div
//                 key={item.product?._id || i}
//                 className="grid grid-cols-[1fr_140px_140px_100px] items-center px-6 py-4 border-t border-slate-100 hover:bg-slate-50 transition-colors"
//               >
//                 <div className="flex items-center gap-3 min-w-0">
//                   <img
//                     src={item.product?.imageUrls?.[0] || "/placeholder.png"}
//                     alt={item.product?.name || "Product"}
//                     className="h-12 w-12 rounded-lg object-cover border border-slate-200 shrink-0"
//                   />
//                   <span className="font-medium text-heading truncate">
//                     {item.product?.name || "Product unavailable"}
//                   </span>
//                 </div>
//                 <div className="text-body">x{item.quantity}</div>
//                 <div className="text-body">
//                   Rs. {item.product?.price?.toLocaleString() ?? "—"}
//                 </div>
//                 <div>
//                   <Link
//                     href={`${PRODUCT_ROUTE}/${item.product?._id}`}
//                     className="text-primary font-medium hover:underline"
//                   >
//                     view
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { cancelOrder, confirmOrder } from "@/api/orders";
import { PRODUCT_ROUTE } from "@/constants/routes";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
} from "@/constants/orderStatus";

const statusStyles = {
  [ORDER_STATUS_PENDING]: "bg-blue-100 text-blue-700",
  [ORDER_STATUS_CONFIRMED]: "bg-indigo-100 text-indigo-700",
  [ORDER_STATUS_SHIPPED]: "bg-purple-100 text-purple-700",
  [ORDER_STATUS_DELIVERED]: "bg-green-100 text-green-700",
  [ORDER_STATUS_CANCELLED]: "bg-red-100 text-red-700",
};

export default function OrderTable({ orders }) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [loadingId, setLoadingId] = useState(null);

  async function handleCancel(orderId) {
    setLoadingId(orderId);
    try {
      const updated = await cancelOrder(orderId);
      setLocalOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updated : o)),
      );
      toast.success("Order cancelled.");
    } catch (err) {
      toast.error(err?.response?.data || "Failed to cancel order.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleConfirmPayment(orderId) {
    setLoadingId(orderId);
    try {
      const updated = await confirmOrder(orderId, ORDER_STATUS_CONFIRMED);
      setLocalOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updated : o)),
      );
      toast.success("Payment confirmed.");
    } catch (err) {
      toast.error(err?.response?.data || "Failed to confirm payment.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {localOrders.map((order) => (
        <div
          key={order._id}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
        >
          {/* Header strip */}
          <div className="bg-slate-50 px-6 py-4 grid grid-cols-[90px_120px_1fr_120px_auto] items-center gap-6">
            <div>
              <p className="text-sm text-muted mb-1">Status</p>
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                  statusStyles[order.status] || "bg-slate-100 text-slate-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted mb-1">Date Placed</p>
              <p className="text-sm text-heading">
                {new Date(order.createdDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted mb-1">Order Number</p>
              <p className="text-sm text-heading truncate">
                {order.orderNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted mb-1">Total amount</p>
              <p className="text-sm text-heading">
                Rs. {order.totalPrice.toLocaleString()}
              </p>
            </div>

            {order.status === ORDER_STATUS_PENDING && (
              <div className="flex items-center gap-6 justify-end">
                <button
                  onClick={() => handleCancel(order._id)}
                  disabled={loadingId === order._id}
                  className="bg-error text-white text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 transition whitespace-nowrap"
                >
                  {loadingId === order._id ? "Cancelling…" : "Cancel order"}
                </button>
                <button
                  onClick={() => handleConfirmPayment(order._id)}
                  disabled={loadingId === order._id}
                  className="text-heading text-sm hover:underline disabled:opacity-50 whitespace-nowrap"
                >
                  Confirm payment
                </button>
              </div>
            )}
          </div>

          {/* Product header row */}
          <div className="grid grid-cols-[1fr_100px_120px_80px] px-6 pt-5 pb-2 text-muted text-sm">
            <div>Product</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {/* Product rows */}
          <div>
            {order.orderItems.map((item, i) => (
              <div
                key={item.product?._id || i}
                className="grid grid-cols-[1fr_100px_120px_80px] items-center px-6 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product?.imageUrls?.[0] || "/placeholder.png"}
                    alt={item.product?.name || "Product"}
                    className="h-12 w-12 rounded-lg object-cover shrink-0"
                  />
                  <span className="font-semibold text-heading truncate">
                    {item.product?.name || "Product unavailable"}
                  </span>
                </div>
                <div className="text-body">x{item.quantity}</div>
                <div className="text-body font-medium">
                  Rs. {item.product?.price?.toLocaleString() ?? "—"}
                </div>
                <div>
                  <Link
                    href={`${PRODUCT_ROUTE}/${item.product?._id}`}
                    className="text-primary hover:underline"
                  >
                    view
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

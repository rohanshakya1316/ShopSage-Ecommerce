import { getAllOrders } from "@/api/orders";
import { statusStyles } from "@/constants/orderStatusStyles";
import useAuthStore from "@/stores/authStore";
import { format } from "date-fns";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, orders]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <th className="px-2 py-4 font-semibold">S.N.</th>
            <th className="px-6 py-4 font-semibold">Order Number</th>
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Total Price</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Created At</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {orders.length == 0 ? (
            <tr>
              <td colSpan={6} className="text-center font-semibold py-4">
                {orders.length === 0
                  ? "No orders containing your products yet."
                  : "No orders match your search."}
              </td>
            </tr>
          ) : (
            orders.slice(0, 4).map((order, index) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors align-top"
              >
                <td className="px-2 py-4 text-gray-600 font-mono text-xs">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                  {order.orderNumber}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col gap-3">
                    {order.orderedProducts?.map((product, i) => (
                      <div
                        key={`${product._id}-${i}`}
                        className="flex items-center"
                      >
                        {product.imageUrls?.length > 0 ? (
                          <Image
                            width={64}
                            height={64}
                            src={product.imageUrls[0]}
                            alt={product.name}
                            className="w-10 h-10 bg-gray-200 rounded-md mr-4 shrink-0 object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-10 h-10 rounded-md mr-4 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {[product.category, product.brand]
                              .filter(Boolean)
                              .join(", ")}
                            {" · "}Qty: {product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">
                    {order.orderUser?.name || "Customer"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.orderUser?.phone}
                  </p>
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  Rs. {order.totalPrice}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      statusStyles[order.status] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-500 text-xs">
                  {order.createdDate
                    ? format(order.createdDate, "dd MMM, yyyy")
                    : "—"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;

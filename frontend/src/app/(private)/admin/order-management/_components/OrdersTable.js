"use client";

import { getAllOrders, getOrdersByMerchant } from "@/api/orders";
import Spinner from "@/components/Spinner";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";
import { ROLE_ADMIN } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { format } from "date-fns";
import { Image as ImageIcon, Pen, Search, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const statusStyles = {
  [ORDER_STATUS_PENDING]: "bg-amber-100 text-amber-700",
  [ORDER_STATUS_CONFIRMED]: "bg-blue-100 text-blue-700",
  [ORDER_STATUS_SHIPPED]: "bg-purple-100 text-purple-700",
  [ORDER_STATUS_DELIVERED]: "bg-green-100 text-green-700",
  [ORDER_STATUS_CANCELLED]: "bg-red-100 text-red-700",
};

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = user.roles.includes(ROLE_ADMIN)
          ? await getAllOrders()
          : await getOrdersByMerchant();

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="bg-background p-4 rounded-xl shadow-sm border border-background/50 mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order number..."
            className="w-full pl-10 pr-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Order Number</th>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Total Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Created At</th>
              <th className="px-6 py-4 font-semibold">
                <Settings />
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {filteredOrders.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-center font-semibold py-4">
                  {orders.length === 0
                    ? "No orders containing your products yet."
                    : "No orders match your search."}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors align-top"
                >
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
                        statusStyles[order.status] ||
                        "bg-gray-200 text-gray-600"
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

                  <td className="px-6 py-4 text-primary text-xs">
                    <Pen/>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;

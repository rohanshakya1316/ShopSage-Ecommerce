"use client";

import { useEffect, useMemo, useState } from "react";
import OrdersHeader from "./_components/OrdersHeader";
import OrderFilters from "./_components/OrderFilters";
import OrderCard from "./_components/OrderCard";
import EmptyOrders from "./_components/EmptyOrders";
import Pagination from "./_components/Pagination";
import { getOrdersByUser } from "@/api/orders";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersByUser()
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = status === "All" || order.status === status;

      const matchesSearch = order.orderItems.some((item) =>
        item.product.name.toLowerCase().includes(search.toLowerCase()),
      );

      return matchesStatus && matchesSearch;
    });
    // .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }, [orders, search, status]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <OrdersHeader search={search} setSearch={setSearch} />

        <OrderFilters status={status} setStatus={setStatus} />

        <div className="space-y-6 mt-8">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <EmptyOrders />
          )}
        </div>

        {filteredOrders.length > 0 && <Pagination />}
      </div>
    </div>
  );
};

export default OrdersPage;

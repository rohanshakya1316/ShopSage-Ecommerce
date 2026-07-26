"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "@/api/orders";
import OrderTable from "./_component/OrderTable";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch((err) =>
        setError(err?.response?.data || "Failed to load orders."),
      );
  }, []);

  if (error) {
    return <p className="text-error text-center py-16">{error}</p>;
  }

  if (!orders) {
    return <p className="text-muted text-center py-16">Loading your orders…</p>;
  }

  if (!orders.length) {
    return (
      <p className="text-muted text-center py-16">
        You haven&apos;t placed any orders yet.
      </p>
    );
  }

  return <OrderTable orders={orders} />;
}

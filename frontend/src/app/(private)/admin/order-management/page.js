"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/api/orders";
import OrdersAdminTable from "./_components/OrdersAdminTable";

export default function OrderManagementPage() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch((err) =>
        setError(err?.response?.data || "Failed to load orders."),
      );
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-heading mb-6">Order Management</h1>

      {error && <p className="text-error">{error}</p>}

      {!error && !orders && <p className="text-muted">Loading orders…</p>}

      {!error && orders && !orders.length && (
        <p className="text-muted">No orders found.</p>
      )}

      {!error && orders?.length > 0 && <OrdersAdminTable orders={orders} />}
    </div>
  );
}

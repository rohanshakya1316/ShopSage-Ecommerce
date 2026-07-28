"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/api/orders";
import OrdersAdminTable from "./_components/OrdersAdminTable";

const PAGE_SIZE = 10;

export default function OrderManagementPage() {
  const [allOrders, setAllOrders] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getAllOrders()
      .then(setAllOrders)
      .catch((err) =>
        setError(err?.response?.data || "Failed to load orders."),
      );
  }, []);

  function handleSort(field) {
    if (field === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPage(1);
  }

  if (error) {
    return <p className="text-error">{error}</p>;
  }

  if (!allOrders) {
    return <p className="text-muted">Loading orders…</p>;
  }

  if (!allOrders.length) {
    return <p className="text-muted">No orders found.</p>;
  }

  const sorted = [...allOrders].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "createdDate") {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalOrders = sorted.length;
  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedOrders = sorted.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <h1 className="text-2xl font-bold text-heading mb-6">Order Management</h1>

      <OrdersAdminTable
        orders={paginatedOrders}
        currentPage={page}
        totalPages={totalPages}
        totalOrders={totalOrders}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onPageChange={setPage}
      />
    </div>
  );
}

"use client";

const statusClasses = {
  PENDING:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  CONFIRMED:
    "bg-blue-100 text-blue-700 border-blue-200",

  DELIVERED:
    "bg-green-100 text-success border-green-200",

  CANCELLED:
    "bg-red-100 text-error border-red-200",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full border px-4 py-1 text-sm font-semibold ${
        statusClasses[status] ||
        "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;
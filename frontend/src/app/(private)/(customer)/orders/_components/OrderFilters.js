"use client";

import {
  ORDER_CANCELLED,
  ORDER_CONFIRMED,
  ORDER_DELIVERED,
  ORDER_PENDING,
  ORDER_SHIPPED,
} from "@/constants/orderStatus";

const filters = [
  "All",
  ORDER_PENDING,
  ORDER_CONFIRMED,
  ORDER_DELIVERED,
  ORDER_CANCELLED,
  ORDER_SHIPPED,
];

const OrderFilters = ({ status, setStatus }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setStatus(item)}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300
          
          ${
            status === item
              ? "bg-primary text-white shadow-lg"
              : "bg-card border border-gray-200 text-body hover:border-primary hover:text-primary"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default OrderFilters;

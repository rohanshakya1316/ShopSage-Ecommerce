"use client";

import { PackageSearch, Search } from "lucide-react";

const OrdersHeader = ({ search, setSearch }) => {
  return (
    <div className="mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <PackageSearch className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-heading">
              My Orders
            </h1>

            <p className="text-body mt-1">
              View, track and manage your purchased products.
            </p>
          </div>

        </div>

        {/* Search */}

        <div className="relative w-full lg:w-96">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            placeholder="Search by Order ID or Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-card py-3 pl-12 pr-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

        </div>

      </div>

    </div>
  );
};

export default OrdersHeader;
// src/app/product-management/page.js
"use client";

import Link from "next/link";
import Table from "./_components/Table";

export default function ProductListPage() {
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Products</h1>
        <Link
          href="/product-management/add"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <Table />
    </div>
  );
}
// src/app/product-management/layout.js

import Link from "next/link";

export const metadata = {
  title: "Product Management",
  description: "Manage your product catalog",
};

export default function ProductManagementLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:max-w-none">
          <Link
            href="/product-management"
            className="text-lg font-semibold text-gray-900"
          >
            Product Management
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/product-management"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              All Products
            </Link>
            <Link
              href="/product-management/add"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Product
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 lg:max-w-none">{children}</main>
    </div>
  );
}
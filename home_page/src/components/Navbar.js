"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-indigo-400"
            >
              ShopSage
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="hover:text-indigo-400 transition">
              Home
            </Link>

            <Link href="#about" className="hover:text-indigo-400 transition">
              About
            </Link>

            <Link
              href="#products"
              className="hover:text-indigo-400 transition"
            >
              Products
            </Link>

            <Link
              href="#deals"
              className="hover:text-indigo-400 transition"
            >
              Orders
            </Link>

            <Link
              href="#contact"
              className="hover:text-indigo-400 transition"
            >
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="hover:text-indigo-400">
              🔍
            </button>

            <button className="relative hover:text-indigo-400">
              🛒

              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 rounded-full">
                3
              </span>
            </button>

            <button className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-slate-800">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block hover:text-indigo-400">
              Home
            </Link>

            <Link
              href="/products"
              className="block hover:text-indigo-400"
            >
              Products
            </Link>

            <Link
              href="/categories"
              className="block hover:text-indigo-400"
            >
              Categories
            </Link>

            <Link href="/deals" className="block hover:text-indigo-400">
              Deals
            </Link>

            <Link
              href="/contact"
              className="block hover:text-indigo-400"
            >
              Contact
            </Link>

            <button className="w-full bg-indigo-600 py-2 rounded-lg">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
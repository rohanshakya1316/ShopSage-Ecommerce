"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const EmptyOrders = () => {
  return (
    <div className="bg-card rounded-2xl shadow-md border border-gray-200 py-20 px-6">

      <div className="max-w-md mx-auto text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-heading">
          No Orders Yet
        </h2>

        <p className="mt-3 text-body">
          Looks like you haven{"'"}t placed any orders yet.
          Start shopping and your orders will appear here.
        </p>

        <Link href="/products">
          <button className="mt-8 rounded-xl bg-primary px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-hover hover:scale-105">
            Continue Shopping
          </button>
        </Link>

      </div>

    </div>
  );
};

export default EmptyOrders;
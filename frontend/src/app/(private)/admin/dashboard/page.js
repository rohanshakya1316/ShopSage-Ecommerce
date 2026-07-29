"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell,
  CircleDollarSign,
  Package2,
  Search,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { getAllUsers } from "@/api/users";
import { getProducts } from "@/api/products";
import Account from "@/components/Account";
import { ORDER_MANAGEMENT_ROUTE } from "@/constants/routes";
import RecentOrders from "./_components/RecentOrders";
import { getAllOrders } from "@/api/orders";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";

const initialStats = [
  {
    title: "Total Revenue",
    value: "$0",
    icon: CircleDollarSign,
    change: "0%",
    changeTone: "text-[#22C55E]",
    iconBg: "bg-[#22C55E]/15",
    iconColor: "text-[#22C55E]",
  },
  {
    title: "Total Orders",
    value: "0",
    icon: ShoppingCart,
    change: "0%",
    changeTone: "text-[#22C55E]",
    iconBg: "bg-[#4F46E5]/10",
    iconColor: "text-[#4F46E5]",
  },
  {
    title: "Active Products",
    value: "0",
    icon: Package2,
    change: "0%",
    changeTone: "text-[#475569]",
    iconBg: "bg-[#FBBF24]/20",
    iconColor: "text-[#FBBF24]",
  },
  {
    title: "Total Users",
    value: "0",
    icon: Users,
    change: "0%",
    changeTone: "text-[#22C55E]",
    iconBg: "bg-[#EF4444]/10",
    iconColor: "text-[#EF4444]",
  },
];

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] =
          await Promise.all([getAllUsers(), getProducts({}), getAllOrders()]);

        const totalUsers = usersResponse.data.length;

        const totalProducts = productsResponse.length;

        const totalOrders = ordersResponse.data.length;

        const totalRevenue = ordersResponse.data
          .filter((order) =>
            [
              ORDER_STATUS_CONFIRMED,
              ORDER_STATUS_SHIPPED,
              ORDER_STATUS_DELIVERED,
            ].includes(order.status),
          )
          .reduce((total, order) => total + Number(order.totalPrice || 0), 0);

        setStats([
          {
            title: "Total Revenue",
            value: totalRevenue,
            icon: CircleDollarSign,
            change: "+12%",
            changeTone: "text-[#22C55E]",
            iconBg: "bg-[#22C55E]/15",
            iconColor: "text-[#22C55E]",
          },
          {
            title: "Total Orders",
            value: totalOrders,
            icon: ShoppingCart,
            change: "+8.5%",
            changeTone: "text-[#22C55E]",
            iconBg: "bg-[#4F46E5]/10",
            iconColor: "text-[#4F46E5]",
          },
          {
            title: "Active Products",
            value: totalProducts,
            icon: Package2,
            change: "0%",
            changeTone: "text-[#475569]",
            iconBg: "bg-[#FBBF24]/20",
            iconColor: "text-[#FBBF24]",
          },
          {
            title: "Total Users",
            value: totalUsers,
            icon: Users,
            change: "+4.2%",
            changeTone: "text-[#22C55E]",
            iconBg: "bg-[#EF4444]/10",
            iconColor: "text-[#EF4444]",
          },
        ]);
      } catch (error) {
        console.error("Failed to load admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="flex h-screen overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
            <div className="flex items-center">
              <button className="mr-4 rounded-md p-2 text-[#475569] transition-colors hover:bg-slate-100 hover:text-[#0F172A] md:hidden">
                <span className="sr-only">Open menu</span>
                <span className="text-xl">☰</span>
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 pl-10 pr-4 text-sm text-[#0F172A] outline-none ring-0 placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative rounded-full p-2 text-[#475569] transition-colors hover:bg-slate-100 hover:text-[#0F172A]">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#EF4444]" />
              </button>

              <Account />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#0F172A]">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-sm text-[#475569]">
                Welcome back, here&apos;s what&apos;s happening in your store
                today.
              </p>
            </div>

            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(
                ({
                  title,
                  value,
                  icon: Icon,
                  change,
                  changeTone,
                  iconBg,
                  iconColor,
                }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#475569]">
                          {title}
                        </p>
                        <h3 className="mt-1 text-2xl font-bold text-[#0F172A]">
                          {loading ? "Loading..." : value}
                        </h3>
                      </div>
                      <div className={`rounded-lg p-3 ${iconBg}`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span
                        className={`font-medium ${changeTone} flex items-center`}
                      >
                        <TrendingUp className="mr-1 h-4 w-4" />
                        {change}
                      </span>
                      <span className="ml-2 text-[#94A3B8]">vs last month</span>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-[#0F172A]">
                  Recent Orders
                </h2>
                <Link
                  href={ORDER_MANAGEMENT_ROUTE}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  View All
                </Link>
              </div>
              <RecentOrders />
            </div>

            <footer className="py-4 text-center text-md font-semibold text-primary">
              © 2026 ShopSage. All rights reserved.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

import React from "react";
import AdminSideBar from "../_components/AdminSideBar";

const page = () => {
  return <div>Dashboard </div>;
};

export default page;

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   BarChart3,
//   Bell,
//   ChevronDown,
//   CircleDollarSign,
//   Eye,
//   LayoutDashboard,
//   LogOut,
//   Package2,
//   Search,
//   Settings,
//   ShoppingCart,
//   TrendingUp,
//   Users,
// } from "lucide-react";
// import api from "@/api/api";
// import { getAllUsers } from "@/api/users";
// import { getProducts } from "@/api/products";

// const navigationItems = [
//   {
//     label: "Dashboard",
//     href: "/admin/dashboard",
//     icon: LayoutDashboard,
//     active: true,
//   },
//   {
//     label: "Products",
//     href: "/admin/products",
//     icon: Package2,
//     active: false,
//   },
//   {
//     label: "Orders",
//     href: "/admin/orders",
//     icon: ShoppingCart,
//     active: false,
//   },
//   {
//     label: "Users",
//     href: "/admin/users",
//     icon: Users,
//     active: false,
//   },
//   {
//     label: "Analytics",
//     href: "#",
//     icon: BarChart3,
//     active: false,
//   },
//   {
//     label: "Settings",
//     href: "#",
//     icon: Settings,
//     active: false,
//   },
// ];

// const initialStats = [
//   {
//     title: "Total Revenue",
//     value: "$0",
//     icon: CircleDollarSign,
//     change: "0%",
//     changeTone: "text-[#22C55E]",
//     iconBg: "bg-[#22C55E]/15",
//     iconColor: "text-[#22C55E]",
//   },
//   {
//     title: "Total Orders",
//     value: "0",
//     icon: ShoppingCart,
//     change: "0%",
//     changeTone: "text-[#22C55E]",
//     iconBg: "bg-[#4F46E5]/10",
//     iconColor: "text-[#4F46E5]",
//   },
//   {
//     title: "Active Products",
//     value: "0",
//     icon: Package2,
//     change: "0%",
//     changeTone: "text-[#475569]",
//     iconBg: "bg-[#FBBF24]/20",
//     iconColor: "text-[#FBBF24]",
//   },
//   {
//     title: "Total Users",
//     value: "0",
//     icon: Users,
//     change: "0%",
//     changeTone: "text-[#22C55E]",
//     iconBg: "bg-[#EF4444]/10",
//     iconColor: "text-[#EF4444]",
//   },
// ];

// const statusStyles = {
//   completed: "bg-[#22C55E]/15 text-[#22C55E]",
//   delivered: "bg-[#22C55E]/15 text-[#22C55E]",
//   confirmed: "bg-[#4F46E5]/10 text-[#4338CA]",
//   shipped: "bg-[#FBBF24]/20 text-[#B45309]",
//   pending: "bg-[#FBBF24]/20 text-[#B45309]",
//   cancelled: "bg-[#EF4444]/10 text-[#EF4444]",
// };

// const formatCurrency = (value) =>
//   new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(value || 0);

// const formatDate = (value) => {
//   if (!value) return "—";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "—";

//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   }).format(date);
// };

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState(initialStats);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       try {
//         const [usersResponse, productsResponse, ordersResponse] =
//           await Promise.allSettled([
//             getAllUsers(),
//             getProducts({}),
//             api.get("/api/orders"),
//           ]);

//         const users =
//           usersResponse.status === "fulfilled"
//             ? Array.isArray(usersResponse.value?.data)
//               ? usersResponse.value.data
//               : usersResponse.value?.data?.users || []
//             : [];

//         const products =
//           productsResponse.status === "fulfilled"
//             ? Array.isArray(productsResponse.value)
//               ? productsResponse.value
//               : productsResponse.value?.products || []
//             : [];

//         const orders =
//           ordersResponse.status === "fulfilled"
//             ? Array.isArray(ordersResponse.value?.data)
//               ? ordersResponse.value.data
//               : ordersResponse.value?.data?.orders || []
//             : [];

//         const totalRevenue = orders.reduce((sum, order) => {
//           const amount = Number(order.totalPrice || order.total || 0);
//           return sum + (Number.isFinite(amount) ? amount : 0);
//         }, 0);

//         const activeProducts = products.filter(
//           (product) => Number(product.stock ?? 0) > 0,
//         ).length;
//         const totalOrders = orders.length;
//         const totalUsers = users.length;

//         setStats([
//           {
//             title: "Total Revenue",
//             value: formatCurrency(totalRevenue),
//             icon: CircleDollarSign,
//             change: "+12%",
//             changeTone: "text-[#22C55E]",
//             iconBg: "bg-[#22C55E]/15",
//             iconColor: "text-[#22C55E]",
//           },
//           {
//             title: "Total Orders",
//             value: totalOrders.toLocaleString(),
//             icon: ShoppingCart,
//             change: "+8.5%",
//             changeTone: "text-[#22C55E]",
//             iconBg: "bg-[#4F46E5]/10",
//             iconColor: "text-[#4F46E5]",
//           },
//           {
//             title: "Active Products",
//             value: activeProducts.toLocaleString(),
//             icon: Package2,
//             change: "0%",
//             changeTone: "text-[#475569]",
//             iconBg: "bg-[#FBBF24]/20",
//             iconColor: "text-[#FBBF24]",
//           },
//           {
//             title: "Total Users",
//             value: totalUsers.toLocaleString(),
//             icon: Users,
//             change: "+4.2%",
//             changeTone: "text-[#22C55E]",
//             iconBg: "bg-[#EF4444]/10",
//             iconColor: "text-[#EF4444]",
//           },
//         ]);

//         setRecentOrders(
//           orders.slice(0, 4).map((order) => {
//             const customerName =
//               order.user?.name || order.customerName || "Guest Customer";
//             const status = (order.status || "pending").toLowerCase();
//             const statusText = status.charAt(0).toUpperCase() + status.slice(1);

//             return {
//               id:
//                 order.orderNumber ||
//                 `#ORD-${order._id?.slice(0, 6).toUpperCase() || "000"}`,
//               customer: customerName,
//               date: formatDate(order.createdDate || order.createdAt),
//               status: statusText,
//               total: formatCurrency(order.totalPrice || order.total || 0),
//               statusClass: statusStyles[status] || statusStyles.pending,
//             };
//           }),
//         );
//       } catch (error) {
//         console.error("Failed to load admin dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboardData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
//       <div className="flex h-screen overflow-hidden">
//         <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm md:flex">
//           <div className="flex h-16 items-center border-b border-slate-200 px-6">
//             <span className="text-2xl font-bold tracking-wider text-[#4F46E5]">
//               <span className="mr-2 inline-flex text-[#FBBF24]">✦</span>
//               ShopSage
//             </span>
//           </div>

//           <nav className="flex-1 overflow-y-auto py-4">
//             <ul className="space-y-1">
//               {navigationItems.map(({ label, href, icon: Icon, active }) => (
//                 <li key={label}>
//                   <Link
//                     href={href}
//                     className={`flex items-center px-6 py-3 transition-colors ${
//                       active
//                         ? "border-r-4 border-[#4F46E5] bg-[#4F46E5]/10 text-[#4F46E5]"
//                         : "text-[#475569] hover:bg-slate-50 hover:text-[#4338CA]"
//                     }`}
//                   >
//                     <Icon className="h-5 w-5" />
//                     <span className="ml-3 font-medium">{label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="border-t border-slate-200 p-4">
//             <Link
//               href="/login"
//               className="flex items-center rounded-md px-2 py-2 text-[#EF4444] transition-colors hover:bg-[#EF4444]/10"
//             >
//               <LogOut className="h-5 w-5" />
//               <span className="ml-3 font-medium">Logout</span>
//             </Link>
//           </div>
//         </aside>

//         <div className="flex flex-1 flex-col overflow-hidden">
//           <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
//             <div className="flex items-center">
//               <button className="mr-4 rounded-md p-2 text-[#475569] transition-colors hover:bg-slate-100 hover:text-[#0F172A] md:hidden">
//                 <span className="sr-only">Open menu</span>
//                 <span className="text-xl">☰</span>
//               </button>
//               <div className="relative hidden sm:block">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-64 rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 pl-10 pr-4 text-sm text-[#0F172A] outline-none ring-0 placeholder:text-[#94A3B8]"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative rounded-full p-2 text-[#475569] transition-colors hover:bg-slate-100 hover:text-[#0F172A]">
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#EF4444]" />
//               </button>

//               <div className="flex items-center">
//                 <img
//                   src="https://ui-avatars.com/api/?name=Admin+User&background=4F46E5&color=fff"
//                   alt="Admin profile"
//                   className="h-9 w-9 rounded-full border border-slate-200 object-cover"
//                 />
//                 <span className="ml-2 hidden text-sm font-medium text-[#0F172A] sm:block">
//                   Admin
//                 </span>
//                 <ChevronDown className="ml-2 hidden h-4 w-4 text-[#94A3B8] sm:block" />
//               </div>
//             </div>
//           </header>

//           <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-8">
//             <div className="mb-6">
//               <h1 className="text-2xl font-bold text-[#0F172A]">
//                 Dashboard Overview
//               </h1>
//               <p className="mt-1 text-sm text-[#475569]">
//                 Welcome back, here&apos;s what&apos;s happening in your store
//                 today.
//               </p>
//             </div>

//             <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {stats.map(
//                 ({
//                   title,
//                   value,
//                   icon: Icon,
//                   change,
//                   changeTone,
//                   iconBg,
//                   iconColor,
//                 }) => (
//                   <div
//                     key={title}
//                     className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <p className="text-sm font-medium text-[#475569]">
//                           {title}
//                         </p>
//                         <h3 className="mt-1 text-2xl font-bold text-[#0F172A]">
//                           {loading ? "Loading..." : value}
//                         </h3>
//                       </div>
//                       <div className={`rounded-lg p-3 ${iconBg}`}>
//                         <Icon className={`h-5 w-5 ${iconColor}`} />
//                       </div>
//                     </div>
//                     <div className="mt-4 flex items-center text-sm">
//                       <span
//                         className={`font-medium ${changeTone} flex items-center`}
//                       >
//                         <TrendingUp className="mr-1 h-4 w-4" />
//                         {change}
//                       </span>
//                       <span className="ml-2 text-[#94A3B8]">vs last month</span>
//                     </div>
//                   </div>
//                 ),
//               )}
//             </div>

//             <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//               <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
//                 <h2 className="text-lg font-semibold text-[#0F172A]">
//                   Recent Orders
//                 </h2>
//                 <Link
//                   href="#"
//                   className="text-sm font-medium text-[#4F46E5] transition-colors hover:text-[#4338CA]"
//                 >
//                   View All
//                 </Link>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse text-left">
//                   <thead>
//                     <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#475569]">
//                       <th className="px-6 py-3 font-medium">Order ID</th>
//                       <th className="px-6 py-3 font-medium">Customer</th>
//                       <th className="px-6 py-3 font-medium">Date</th>
//                       <th className="px-6 py-3 font-medium">Status</th>
//                       <th className="px-6 py-3 font-medium">Total</th>
//                       <th className="px-6 py-3 text-right font-medium">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100 text-sm">
//                     {recentOrders.length > 0 ? (
//                       recentOrders.map((order) => (
//                         <tr
//                           key={order.id}
//                           className="transition-colors hover:bg-slate-50"
//                         >
//                           <td className="px-6 py-4 font-medium text-[#0F172A]">
//                             {order.id}
//                           </td>
//                           <td className="px-6 py-4 text-[#475569]">
//                             <div className="flex items-center">
//                               <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-[#475569]">
//                                 {order.customer
//                                   .split(" ")
//                                   .map((name) => name[0])
//                                   .join("")}
//                               </div>
//                               {order.customer}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-[#94A3B8]">
//                             {order.date}
//                           </td>
//                           <td className="px-6 py-4">
//                             <span
//                               className={`rounded-full px-2.5 py-1 text-xs font-medium ${order.statusClass}`}
//                             >
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 font-medium text-[#0F172A]">
//                             {order.total}
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <button className="text-[#94A3B8] transition-colors hover:text-[#4F46E5]">
//                               <Eye className="h-4 w-4" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="6"
//                           className="px-6 py-8 text-center text-sm text-[#94A3B8]"
//                         >
//                           {loading
//                             ? "Loading orders..."
//                             : "No orders available yet."}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <footer className="py-4 text-center text-sm text-[#94A3B8]">
//               © 2026 ShopSage. All rights reserved.
//             </footer>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

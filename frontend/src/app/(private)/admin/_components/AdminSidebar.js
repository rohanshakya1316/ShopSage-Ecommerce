"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Moon,
  LogOut,
} from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { LOGIN_ROUTE } from "@/constants/routes";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    label: "Product Management",
    href: "/admin/product-management",
    icon: Package,
  },
  {
    label: "Order Management",
    href: "/admin/order-management",
    icon: ShoppingCart,
  },
  { label: "User Management", href: "/admin/user-management", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.replace(LOGIN_ROUTE);
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-screen flex flex-col px-4 py-6">
      <Link href="/" className="text-2xl font-bold text-heading px-2 mb-8">
        FashionWear
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-body hover:bg-slate-50"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-error text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}

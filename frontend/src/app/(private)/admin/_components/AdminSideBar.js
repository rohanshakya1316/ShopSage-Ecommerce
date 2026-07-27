"use client";

import { adminMenu, HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminSideBar = () => {
  const pathname = usePathname();

  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace(LOGIN_ROUTE);
  };
  return (
    <div className="border-r border-slate-200  bg-background shadow-sm">
      <aside className="hidden w-64 shrink-0 flex-col  md:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <span className="mr-2 inline-flex text-accent text-3xl">✦</span>
          <Link href={HOME_ROUTE} className="text-3xl font-bold text-primary">
            ShopSage
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 transition-all">
          <ul className="space-y-1">
            {adminMenu.map(({ label, route, Icon }) => {
              const isActive = pathname === route;
              return (
                <li key={label}>
                  <Link
                    href={route}
                    className={`flex items-center px-6 py-3 transition-colors ${
                      isActive
                        ? "border-r-4 border-primary bg-primary/10 text-primary"
                        : "text-[#475569] hover:bg-slate-50 hover:text-primary-hover"
                    }`}
                  >
                    {Icon}
                    <span className="ml-3 font-medium">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-b border-slate-300 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center rounded-md px-2 py-2 text-[#EF4444] transition-colors hover:bg-[#EF4444]/10"
          >
            <LogOut />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSideBar;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import placeholder from "@/assets/images/placeholder.png";
import useAuthStore from "@/stores/authStore";

import {
  DASHBOARD_MANAGEMENT_ROUTE,
  LOGIN_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
} from "@/constants/routes";

import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Package,
  User,
} from "lucide-react";

const Account = () => {
  const [open, setOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore.getState();

  const router = useRouter();

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.replace(LOGIN_ROUTE);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Button */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-accent px-2 py-1 shadow-sm transition-all hover:border-primary hover:shadow-md "
      >
        <Image
          src={user?.profileImageUrl ?? placeholder}
          alt={user?.name || "Profile Image"}
          width={42}
          height={42}
          className="h-10 w-10 rounded-full border-2 border-primary object-cover "
        />

        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-heading">
            {user?.name || "Guest"}
          </p>

          <p className="text-xs text-primary">{user?.email}</p>
        </div>

        <ChevronDown
          size={18}
          className={`hidden md:block transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}

      <div
        className={` absolute right-0 mt-3 w-80 origin-top-right rounded-2xl bg-card border border-gray-200 shadow-2xl overflow-hidden transition-all duration-200 z-50 ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} `}
      >
        {/* Header */}

        <div className="bg-primary px-6 py-5 text-white">
          <div className="flex items-center gap-4">
            <Image
              src={user?.profileImageUrl ?? placeholder}
              alt={user?.name || "Profile Image"}
              width={58}
              height={58}
              className="rounded-full border-2 border-white object-cover "
            />

            <div className="overflow-hidden">
              <h3 className="font-semibold text-lg truncate">{user?.name}</h3>

              <p className="text-sm text-indigo-100 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu */}

        <div className="p-2">
          <Link
            href={PROFILE_ROUTE}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-body transition hover:bg-indigo-50 hover:text-primary "
          >
            <User size={20} />
            <span>My Profile</span>
          </Link>

          <Link
            href={ORDER_ROUTE}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-body transition hover:bg-indigo-50 hover:text-primary "
          >
            <Package size={20} />
            <span>My Orders</span>
          </Link>

          {(user?.roles?.includes(ROLE_ADMIN) ||
            user?.roles?.includes(ROLE_MERCHANT)) && (
            <Link
              href={DASHBOARD_MANAGEMENT_ROUTE}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-body transition hover:bg-indigo-50 hover:text-primary "
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          )}

          <div className="my-2 border-t border-gray-200" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-error transition hover:bg-red-50 "
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;

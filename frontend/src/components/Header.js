"use client";

import { useEffect, useState } from "react";
import { HOME_ROUTE, LOGIN_ROUTE, navMenu } from "@/constants/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  const { isAuthenticated, logout } = useAuthStore.getState();

  const router = useRouter();

  const handleLogout = () => {
    logout();

    router.replace(LOGIN_ROUTE);
  };

  useEffect(() => {}, [isAuthenticated]);

  return (
    <header className="sticky! top-0! z-50!">
      <nav className="bg-slate-900 text-white shadow-lg w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-400">
                ShopSage
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navMenu.map((menu) => {
                const isActive =
                  pathName == menu.route ||
                  (menu.route !== HOME_ROUTE &&
                    pathName.startsWith(menu.route));
                return (
                  <Link
                    key={menu.route}
                    href={menu.route}
                    className={`hover:text-indigo-400 ${isActive ? "text-indigo-400" : ""} transition`}
                  >
                    {menu.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-5">
              {isAuthenticated ? (
                <>
                  <button className="relative hover:text-indigo-400">
                    🛒
                    <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 rounded-full">
                      3
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href={LOGIN_ROUTE}>
                  <button className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-3xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-slate-800 overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="px-4 space-y-4 text-end">
            {navMenu.map((menu) => (
              <Link
                key={menu.route}
                href={menu.route}
                className="block hover:text-indigo-400"
                onClick={() => setMenuOpen(false)}
              >
                {menu.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-4 pt-2 justify-end">
                  <button className="relative hover:text-indigo-400 text-xl">
                    🛒
                    <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 rounded-full">
                      3
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href={LOGIN_ROUTE}>
                <button className="max-w-5xl bg-indigo-600 p-2 rounded-lg hover:bg-indigo-700 transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

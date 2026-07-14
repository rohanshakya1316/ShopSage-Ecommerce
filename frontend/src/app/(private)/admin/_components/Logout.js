"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

const Logout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      Logout
    </button>
  );
};

export default Logout;

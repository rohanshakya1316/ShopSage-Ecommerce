"use client";

import useAuthStore from "@/stores/authStore";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";
import AdminSideBar from "./_components/AdminSideBar";

const MerchantLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore.getState();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // redirect to login page
      return router.replace(LOGIN_ROUTE);
    }

    if (
      !user.roles.includes(ROLE_MERCHANT) &&
      !user.roles.includes(ROLE_ADMIN)
    ) {
      return router.push(HOME_ROUTE);
    }
  });

  if (!isAuthenticated) return;

  return (
    <section className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <AdminSideBar />
      <div className="">{children}</div>
    </section>
  );
};

export default MerchantLayout;

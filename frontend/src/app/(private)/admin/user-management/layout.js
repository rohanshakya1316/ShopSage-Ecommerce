"use client";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { ROLE_ADMIN } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserManagementLayout = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.replace(LOGIN_ROUTE);

    if (!user.roles.includes(ROLE_ADMIN)) return router.replace(HOME_ROUTE);
  }, [user, router]);
  return <div>{children}</div>;
};

export default UserManagementLayout;

"use client";

import Image from "next/image";
import login_hero from "@/assets/images/login_hero.png";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HOME_ROUTE } from "@/constants/routes";

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useAuthStore.getState();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(HOME_ROUTE);
    }
  });

  if (isAuthenticated) return;

  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="mt-4 w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Image
            src={login_hero}
            alt="Login"
            width={600}
            height={600}
            className="hidden md:block h-full w-full object-cover"
            loading="eager"
          />

          <div className="flex items-center justify-center p-10">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;

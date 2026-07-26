"use client";

import { PRODUCT_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";

const ErrorPage = ({ error }) => {
  const router = useRouter();

  setTimeout(() => {
    router.push(PRODUCT_ROUTE);
  }, 5000);

  return <div>{error.message}</div>;
};

export default ErrorPage;

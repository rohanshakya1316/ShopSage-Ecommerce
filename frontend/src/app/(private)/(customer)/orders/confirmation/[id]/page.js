"use client";

import { confirmOrder } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { ORDER_ROUTE } from "@/constants/routes";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OrderConfirmationPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const status = searchParams.get("status");

  useEffect(() => {
    if (status == "Completed") {
      toast.success("Payment success");

      confirmOrder(params.id, "success")
        .then(() => {
          router.replace(ORDER_ROUTE);
        })
        .catch((error) => console.log(error));
    } else {
      toast.error("Payment failed", {
        onClose: () => {
          router.replace(ORDER_ROUTE);
        },
      });
    }
  });

  return (
    <div className="flex items-center justify-center py-24">
      <Spinner />
    </div>
  );
};

export default OrderConfirmationPage;

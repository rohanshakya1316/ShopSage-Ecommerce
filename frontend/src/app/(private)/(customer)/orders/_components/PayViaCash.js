import { payViaCash } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { ORDER_ROUTE } from "@/constants/routes";
import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PayViaCash = ({ orderId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initCashPayment = () => {
    setLoading(true);
    console.log(orderId);
    payViaCash(orderId)
      .then(() => {
        console.log("Payment cash");
        router.push(`${ORDER_ROUTE}/confirmation/${orderId}?status=Completed`);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <button
        onClick={initCashPayment}
        className="w-full
       flex items-center justify-center gap-2 rounded-xl border border-green-500 py-3 px-4 shadow-sm hover:bg-green-500 hover:text-white duration-300 transition-all"
      >
        <Banknote size={20} />
        Cash on Delivery
        {loading && <Spinner className="w-6! h-6! ml-2" />}
      </button>
    </div>
  );
};

export default PayViaCash;

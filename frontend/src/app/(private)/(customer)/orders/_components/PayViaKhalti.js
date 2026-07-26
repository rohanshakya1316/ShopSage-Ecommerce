import Image from "next/image";
import khaltiLogo from "@/assets/images/khaltiLogo.png";
import { useState } from "react";
import { payViaKhalti } from "@/api/orders";
import Spinner from "@/components/Spinner";

const PayViaKhalti = ({orderId}) => {
  const [loading, setLoading] = useState(false);

  const initKhaltiPayment = () => {
    setLoading(true);

    payViaKhalti(orderId)
      .then((response) => {
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  };
  return (
    <div>
      <button
        onClick={initKhaltiPayment}
        className="w-full
       flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 px-4 shadow-sm hover:bg-gray-100 duration-300 transition-all
      "
      >
        <Image
          src={khaltiLogo}
          alt="Khalti"
          width={100}
          height={50}
          className="h-6 w-auto"
        />
        {loading && <Spinner className="w-6! h-6! ml-2" />}
      </button>
    </div>
  );
};

export default PayViaKhalti;

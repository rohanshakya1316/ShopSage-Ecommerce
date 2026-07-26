import { createOrder } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { ORDER_ROUTE } from "@/constants/routes";
import useCartStore from "@/stores/cartStore";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CheckoutButton = ({ products, totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCartStore.getState();

  const router = useRouter();

  const checkoutOrder = () => {
    setLoading(true);

    createOrder({
      totalPrice,
      orderItems: products.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    })
      .then(() => {
        toast.success("Order created successfully!");

        router.push(ORDER_ROUTE);

        clearCart();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to checkout!");
      })
      .finally(setLoading(false));
  };

  return (
    <div>
      <button
        type="button"
        onClick={checkoutOrder}
        className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
      >
        <Lock size={20} />
        Secure Checkout {loading && <Spinner className="h-6! w-6!" />}
      </button>
    </div>
  );
};

export default CheckoutButton;

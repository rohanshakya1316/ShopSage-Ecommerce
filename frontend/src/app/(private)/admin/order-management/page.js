import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";
import OrdersTable from "./_components/OrdersTable";

export const metadata = {
  title: "Order Management",
};

const OrderManagementPage = () => {
  return (
    <section className="max-w-7xl mx-auto bg-background py-6 px-4 flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* Top Navbar */}
      <div className="h-16 bg-background shadow-sm flex items-center justify-between px-6 z-10 border-b border-muted rounded-md">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-dark-bg">
            Order Management
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src={placeholder}
            alt="Merchant Profile"
            className="w-9 h-9 rounded-full"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Main Content area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background my-2 p-6 border border-gray-300 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark-bg">Orders</h2>
            <p className="text-muted text-sm mt-1">
              Orders containing products you sell.
            </p>
          </div>
        </div>

        <OrdersTable />
      </main>
    </section>
  );
};

export default OrderManagementPage;

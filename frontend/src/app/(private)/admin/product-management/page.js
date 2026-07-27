import placeholder from "@/assets/images/placeholder.png";
import { PRODUCT_MANAGEMENT_ROUTE } from "@/constants/routes";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductsTable from "./_components/Table";

export const metadata = {
  title: "Product Managment",
};

const ProductManagementPage = () => {
  return (
    <section className="max-w-7xl mx-auto bg-background py-4 px-4 flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* Top Navbar */}
      <div className="h-16 bg-background shadow-sm flex items-center justify-between px-6 z-10 border-b border-muted rounded-md">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-dark-bg">
            Product Management
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src={placeholder}
            alt="Admin Profile"
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
            <h2 className="text-2xl font-bold text-dark-bg">Products</h2>
            <p className="text-muted text-sm mt-1">
              Manage your store products and inventory.
            </p>
          </div>
          <Link href={`${PRODUCT_MANAGEMENT_ROUTE}/add`}>
            <button className="bg-primary text-background px-4 py-2 gap-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm flex items-center">
              <Plus /> Add Product
            </button>
          </Link>
        </div>

        <ProductsTable />
      </main>
    </section>
  );
};

export default ProductManagementPage;

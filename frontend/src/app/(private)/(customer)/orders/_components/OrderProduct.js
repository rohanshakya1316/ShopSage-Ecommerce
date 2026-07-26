"use client";

import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";
import { Eye } from "lucide-react";
import Link from "next/link";
import { PRODUCT_ROUTE } from "@/constants/routes";

const OrderProduct = ({ item }) => {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Image */}

        <div className="relative w-full sm:w-28 h-56 sm:h-28 rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={item.product.imageUrls[0] ?? placeholder}
            alt={item.product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Details */}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-heading">
            {item.product.name}
          </h3>

          <p className="text-muted mt-1">Brand : {item.product.brand}</p>

          <div className="flex flex-wrap gap-6 mt-5">
            <div>
              <p className="text-xs text-muted uppercase">Quantity</p>

              <p className="font-semibold text-heading mt-1">{item.quantity}</p>
            </div>

            <div>
              <p className="text-xs text-muted uppercase">Price</p>

              <p className="font-semibold text-heading mt-1">
                Rs. {item.product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted uppercase">Total</p>

              <p className="font-bold text-primary mt-1">
                Rs. {(item.product.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Link href={`${PRODUCT_ROUTE}/${item.product._id}`}>
            <button
              className="self-center
                inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Eye size={20} />
              <span>View Details</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;

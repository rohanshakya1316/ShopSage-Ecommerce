"use client";

import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";

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
      </div>
    </div>
  );
};

export default OrderProduct;

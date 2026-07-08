"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";

export default function Card({ product }) {
  const { _id, name, brand, price, imageUrls, category, stock } = product;
  const image = imageUrls?.[0] || "/placeholder.png";
  const lowStock = stock !== undefined && stock < 10;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full text-black">
      <Link
        href={`/products/${_id}`}
        className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden block"
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <span className="absolute top-2 left-2 bg-sky-500 text-white text-[11px] font-medium px-2 py-1 rounded-full shadow-sm">
          {category}
        </span>

        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        {lowStock && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            Only {stock} left
          </span>
        )}
      </Link>

      <div className="p-2.5 flex flex-col gap-0.5 flex-1">
        <Link href={`/products/${_id}`}>
          <h3 className="font-semibold text-sm line-clamp-1 hover:text-orange-600 transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 text-amber-400 text-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400" />
          ))}
          <span className="text-gray-400 ml-1">(24)</span>
        </div>

        <p className="text-xs text-gray-500">
          Brand: <span className="font-medium text-gray-700">{brand}</span>
        </p>

        <p className="text-orange-600 font-bold text-base mt-auto pt-0.5">
          Rs. {price.toLocaleString()}
        </p>

        <div className="flex gap-2 pt-2">
          <Link
            href={`/products/${_id}`}
            className="flex-1 text-center text-xs sm:text-sm font-medium border border-gray-300 rounded-full py-1.5 px-2 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            View
          </Link>
          <button className="flex-1 text-xs sm:text-sm font-medium bg-orange-500 text-white rounded-full py-1.5 px-2 hover:bg-orange-600 active:scale-95 transition-all shadow-sm hover:shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

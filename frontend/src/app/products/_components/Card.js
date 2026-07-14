"use client";

import Link from "next/link";
import AddToCart from "../_components/AddToCart";

export default function Card({ product }) {
  const { _id, name, brand, price, imageUrls, category, stock } = product;
  const image = imageUrls?.[0] || "/placeholder.png";

  const hasDiscount = false;
  const originalPrice = null;

  return (
    <div className="bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group flex flex-col h-full">
      {/* Product Image */}
      <Link href={`/products/${_id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <span className="inline-block text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit font-medium">
          {category}
        </span>

        {/* Product name */}
        <Link href={`/products/${_id}`}>
          <h3 className="text-base font-bold text-heading mt-2 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Star rating */}
        <div className="text-accent mt-1 text-sm leading-none tracking-widest">
          ★★★★★
          <span className="text-muted text-xs ml-1 tracking-normal">(24)</span>
        </div>

        {/* Brand */}
        <p className="text-xs text-muted mt-1.5">
          Brand: <span className="font-medium text-body">{brand}</span>
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl font-bold text-primary">
            Rs. {price.toLocaleString()}
          </span>
          {hasDiscount && originalPrice && (
            <span className="line-through text-muted text-sm">
              Rs. {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Low stock warning */}
        {stock !== undefined && stock < 10 && stock > 0 && (
          <span className="text-xs text-red-500 font-medium mt-1">
            Only {stock} left in stock!
          </span>
        )}

        {/* Out of stock */}
        {stock === 0 && (
          <span className="text-xs text-red-500 font-medium mt-1">
            Out of stock
          </span>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="grid grid-cols-[auto_1fr] justify-between items-center gap-4 mt-4">
          <Link
            href={`/products/${_id}`}
            className="px-10 bg-background border border-slate-300 py-2 w-full text-center rounded-3xl text-sm font-medium text-heading transition duration-300 ease hover:text-primary hover:border-primary"
          >
            View
          </Link>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}

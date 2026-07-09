"use client";

import Link from "next/link";

export default function Card({ product }) {
  const { _id, name, brand, price, imageUrls, category, stock } = product;
  const image = imageUrls?.[0] || "/placeholder.png";

  const hasDiscount = false;
  const originalPrice = null;

  return (
    <div className="bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group flex flex-col h-full">
      <Link href={`/products/${_id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-sm text-muted">{category}</span>

        <Link href={`/products/${_id}`}>
          <h3 className="text-lg font-bold text-heading mt-2 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="text-accent mt-2 text-lg leading-none">★★★★★</div>

        <p className="text-xs text-muted mt-2">
          Brand: <span className="font-medium text-body">{brand}</span>
        </p>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-primary">
            Rs. {price.toLocaleString()}
          </span>
          {hasDiscount && originalPrice && (
            <span className="line-through text-muted">
              Rs. {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {stock !== undefined && stock < 10 && (
          <span className="text-xs text-error font-medium mt-1">
            Only {stock} left in stock
          </span>
        )}

        <div className="flex gap-3 mt-4">
          <Link
            href={`/products/${_id}`}
            className="flex-1 text-center border border-slate-300 text-heading py-3 rounded-lg hover:bg-background hover:border-slate-400 transition-colors"
          >
            View
          </Link>
          <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-hover active:scale-95 transition-all">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

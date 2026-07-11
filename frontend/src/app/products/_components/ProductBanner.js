"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { CATEGORY_ROUTE, PRODUCT_ROUTE } from "@/constants/routes";

const ProductBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#4F46E5] text-white">
      {/* Background Decorations */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#4F46E5]/30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#FBBF24]/20 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-8 py-16 lg:flex-row lg:justify-between">
        {/* Left Content */}
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <Star size={16} className="mr-2 fill-[#FBBF24] text-[#FBBF24]" />
            Trusted by 20,000+ Happy Customers
          </div>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Discover Your
            <span className="block text-[#FBBF24]">
              Perfect Shopping Experience
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Premium quality products, unbeatable prices, and lightning-fast
            delivery. Shop smarter with ShopSage.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`${PRODUCT_ROUTE}`}
              className="group inline-flex items-center rounded-xl bg-[#FBBF24] px-7 py-4 font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Shop Now
              <ArrowRight
                size={20}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={`${CATEGORY_ROUTE}`}
              className="rounded-xl border border-white/30 px-7 py-4 font-semibold transition hover:bg-white/10"
            >
              Explore Categories
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-10 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-bold text-[#FBBF24]">50K+</h3>
              <p className="text-slate-300">Products</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#FBBF24]">98%</h3>
              <p className="text-slate-300">Positive Reviews</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#FBBF24]">24/7</h3>
              <p className="text-slate-300">Support</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="relative h-90 w-[320px]">
            {/* Main Card */}
            <div className="absolute right-0 top-6 w-72 rounded-3xl bg-white p-5 shadow-2xl transition duration-500 hover:-translate-y-2">
              <div className="flex h-52 items-center justify-center rounded-2xl bg-slate-100">
                <ShoppingBag size={90} className="text-[#4F46E5]" />
              </div>

              <div className="mt-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Trending
                </span>

                <h3 className="mt-3 text-xl font-bold text-slate-800">
                  Premium Collection
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Up to 40% OFF on selected products.
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#4F46E5]">$89</span>

                  <button className="rounded-xl bg-[#4F46E5] px-4 py-2 text-white transition hover:bg-[#4338CA]">
                    Buy
                  </button>
                </div>
              </div>
            </div>

            {/* Discount Badge */}
            <div className="absolute left-0 top-0 animate-bounce rounded-2xl bg-[#FBBF24] px-6 py-4 text-center font-bold text-slate-900 shadow-xl">
              <p className="text-3xl">40%</p>
              <p>OFF</p>
            </div>

            {/* Rating Card */}
            <div className="absolute bottom-2 left-4 rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Star className="fill-[#FBBF24] text-[#FBBF24]" size={18} />
                <span className="font-bold text-slate-800">4.9/5</span>
              </div>

              <p className="text-sm text-slate-500">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;

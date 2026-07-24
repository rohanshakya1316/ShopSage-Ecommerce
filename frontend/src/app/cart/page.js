"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  Tag,
  Truck,
  ShoppingCart,
  Eye,
  Star,
  Heart,
} from "lucide-react";
import { PRODUCT_ROUTE } from "@/constants/routes";
import placeholder from "@/assets/images/placeholder.png";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";
import { recommendedProducts } from "@/constants/recommendedProducts";

const CartPage = () => {
  const products = useCartStore((state) => state.items);

  const { updateQuantity, getTotalCount, getTotalPrice, removeFromCart } =
    useCartStore.getState();

  const shipping = getTotalPrice() > 100000 ? 0 : 500;

  const tax = Math.round(getTotalPrice() * 0.13);

  const total = getTotalPrice() + shipping + tax;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary-hover text-white py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-accent" />

            <div>
              <h1 className="text-4xl font-bold">Shopping Cart</h1>

              <p className="text-slate-300 mt-2">
                Review your items before checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item._id}
                  className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Image */}
                    <div className="relative w-full md:w-44 h-52 md:h-40 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={item.imageUrls[0] ?? placeholder}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition duration-300"
                        loading="eager"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-heading">
                          {item.name}
                        </h2>

                        <p className="text-body mt-2">
                          Brand:
                          <span className="ml-2 text-heading font-medium">
                            {item.brand}
                          </span>
                        </p>

                        <p
                          className={`mt-2 font-medium ${item.stock >= 10 ? "text-success" : "text-error"}`}
                        >
                          {item.stock} stock left
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-6">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-xl w-fit">
                          <button
                            type="button"
                            onClick={() => {
                              updateQuantity(
                                item._id,
                                item.quantity - 1,
                                item.stock,
                              );
                            }}
                            className="p-3 cursor-pointer hover:bg-gray-100 transition"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="px-5 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1,
                                item.stock,
                              )
                            }
                            className="p-3 cursor-pointer hover:bg-gray-100 transition"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>

                          <p className="text-muted text-sm">
                            Rs. {item.price.toLocaleString()} each
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Are you sure to remove?")) {
                              removeFromCart(item._id);
                              toast.success(`${item.name} removed from cart.`);
                            }
                          }}
                          className="flex items-center gap-2 text-error hover:text-red-700 transition"
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex gap-3 text-3xl text-muted">
                <ShoppingCart size={30} />
                Cart is Empty
              </div>
            )}

            {/* Continue Shopping */}
            <Link href={PRODUCT_ROUTE}>
              <button className="flex items-center gap-2 text-primary font-semibold hover:text-primary-hover transition">
                <ArrowLeft size={18} />
                Continue Shopping
              </button>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <aside>
            <div className="sticky top-24 space-y-6">
              {/* ORDER SUMMARY */}
              <div className="bg-card rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-white px-6 py-5">
                  <h2 className="text-2xl font-bold">Order Summary</h2>

                  <p className="text-sm text-indigo-100 mt-1">
                    {getTotalCount()} Items
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Coupon */}
                  <div>
                    <label className="text-sm font-medium text-heading flex items-center gap-2 mb-3">
                      <Tag size={18} className="text-primary" />
                      Coupon Code
                    </label>

                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter coupon"
                        className="flex-1 border border-gray-300 rounded-l-xl px-4 py-3 outline-none focus:border-primary"
                      />

                      <button className="bg-primary hover:bg-primary-hover text-white px-5 rounded-r-xl transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-body">Subtotal</span>

                      <span className="font-semibold text-heading">
                        Rs. {getTotalPrice()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-body">Shipping</span>

                      {shipping === 0 ? (
                        <span className="font-semibold text-success">FREE</span>
                      ) : (
                        <span className="font-semibold text-heading">
                          Rs. {shipping}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <span className="text-body">VAT (13%)</span>

                      <span className="font-semibold text-heading">
                        Rs. {tax.toLocaleString()}
                      </span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-heading">
                        Total
                      </span>

                      <span className="text-3xl font-bold text-primary">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* CHECKOUT */}
                  <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                    <Lock size={20} />
                    Secure Checkout
                  </button>

                  <Link href={PRODUCT_ROUTE}>
                    <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-xl font-semibold transition">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>

              {/* SHIPPING INFO */}
              <div className="bg-card rounded-2xl shadow border border-gray-100 p-6">
                <div className="flex gap-4">
                  <Truck className="text-primary" size={26} />

                  <div>
                    <h3 className="font-semibold text-heading">
                      Free Shipping
                    </h3>

                    <p className="text-sm text-body mt-2">
                      Orders above
                      <span className="font-semibold text-success">
                        {" "}
                        Rs. 100,000{" "}
                      </span>
                      qualify for free delivery anywhere in Nepal.
                    </p>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="bg-card rounded-2xl shadow border border-gray-100 p-6">
                <div className="flex gap-4">
                  <CreditCard className="text-primary" size={26} />

                  <div>
                    <h3 className="font-semibold text-heading">
                      Payment Methods
                    </h3>

                    <p className="text-body text-sm mt-2">We accept:</p>

                    <div className="flex gap-2 flex-wrap mt-4">
                      <span className="bg-background px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary-hover/20">
                        Stripe
                      </span>

                      <span className="bg-background px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary-hover/20">
                        eSewa
                      </span>

                      <span className="bg-background px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary-hover/20">
                        Khalti
                      </span>

                      <span className="bg-background px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary-hover/20">
                        Cash
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECURITY */}
              <div className="bg-success/10 rounded-2xl border border-success/30 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-success" />

                  <div>
                    <h3 className="font-semibold text-heading">
                      Secure Checkout
                    </h3>

                    <p className="text-sm text-body mt-1">
                      Your payment information is encrypted and processed
                      securely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* PEOPLE ALSO BOUGHT */}
        <section className="mt-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-heading">
                People Also Bought
              </h2>

              <p className="text-body mt-2">
                Customers who purchased these items also liked these products.
              </p>
            </div>

            <Link
              href={PRODUCT_ROUTE}
              className="text-primary hover:text-primary-hover font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden bg-background">
                  <Image
                    src={product.image}
                    alt={product.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Discount */}
                  <div className="absolute top-4 left-4 bg-error text-white px-3 py-1 rounded-full text-xs font-semibold">
                    -{product.discount}%
                  </div>

                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-primary hover:text-white transition">
                    <Heart size={18} />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="fill-accent text-accent" size={18} />

                    <span className="font-semibold text-heading">
                      {product.rating}
                    </span>

                    <span className="text-muted text-sm">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-lg text-heading line-clamp-2 min-h-14">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-primary text-2xl font-bold">
                      Rs. {product.price.toLocaleString()}
                    </span>

                    <span className="text-muted line-through">
                      Rs. {product.oldPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="bg-primary hover:bg-primary-hover text-white rounded-xl py-3 flex items-center justify-center gap-2 transition">
                      <ShoppingCart size={18} />
                      Add
                    </button>

                    <button className="border border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-3 flex items-center justify-center gap-2 transition">
                      <Eye size={18} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default CartPage;

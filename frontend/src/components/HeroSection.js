import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <span className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
              🔥 New Collection Available
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
              Shop Smarter with
              <span className="text-indigo-400">ShopSage</span>
            </h1>

            <p className="text-slate-300 text-lg mt-6 max-w-xl">
              Discover premium products, exclusive deals, and seamless shopping
              experiences. Everything you need, delivered right to your
              doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                Shop Now
              </button>

              <button className="border border-slate-500 text-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition">
                Explore Categories
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-12 text-center lg:text-left">
              <div>
                <h3 className="text-3xl font-bold text-white">50K+</h3>
                <p className="text-slate-400">Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">10K+</h3>
                <p className="text-slate-400">Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">99%</h3>
                <p className="text-slate-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-3xl pt-6 p-8 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" // Removed ?w=800
                alt="Product"
                width={800} // Tells Next.js to generate a 250px wide source
                height={800} // Tells Next.js to generate a 250px high source
                className="rounded-2xl w-full h-100 object-cover" // Removed w-full and h-100
              />

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  Premium Smart Watch
                </h3>

                <p className="text-slate-500 mt-2">
                  Modern design with advanced features.
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-3xl font-bold text-primary">
                    Rs. 2499
                  </span>

                  <button className="flex gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary-hover">
                    Add to Cart <ShoppingCart/>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Discount Card */}
            <div className="absolute -top-2 -left-5 bg-accent text-slate-900 px-6 py-4 rounded-xl shadow-lg font-bold animate-bounce">
              🎉 30% OFF
            </div>

            {/* Floating Delivery Card */}
            <div className="absolute -bottom-15 -right-5 bg-background p-4 rounded-xl shadow-xl animate-bounce">
              <p className="font-semibold">🚚 Free Delivery</p>
              <p className="text-sm text-muted">On orders above $50</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

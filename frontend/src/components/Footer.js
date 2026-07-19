import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  ORDER_ROUTE,
  PRODUCT_ROUTE,
} from "@/constants/routes";
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400">ShopSage</h2>

            <p className="mt-4 text-slate-400 leading-relaxed">
              Your smart shopping destination. Discover trending products,
              unbeatable deals, and a seamless shopping experience all in one
              place.
            </p>

            <div className="flex gap-4 mt-6 text-2xl">
              <Link href="#">🌐</Link>
              <Link href="#">📘</Link>
              <Link href="#">🐦</Link>
              <Link href="#">📸</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href={PRODUCT_ROUTE}>Products</Link>
              </li>

              <li>
                <Link href={ABOUT_ROUTE}>About</Link>
              </li>

              <li>
                <Link href={ORDER_ROUTE}>Orders</Link>
              </li>

              <li>
                <Link href={CONTACT_ROUTE}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Support</h3>

            <ul className="space-y-3">
              <li>
                <Link href="#">Help Center</Link>
              </li>

              <li>
                <Link href="#">Shipping Info</Link>
              </li>

              <li>
                <Link href="#">Returns</Link>
              </li>

              <li>
                <Link href="#">Order Tracking</Link>
              </li>

              <li>
                <Link href="#">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>

            <p className="mb-4 text-slate-400">
              Subscribe to get updates on new arrivals and deals.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 rounded-l-lg text-black focus:outline-none"
              />

              <button className="bg-indigo-600 px-4 rounded-r-lg hover:bg-indigo-700 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2026 ShopSage. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link href="#">Privacy Policy</Link>

            <Link href="#">Terms</Link>

            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { CONTACT_ROUTE, PRODUCT_ROUTE } from "@/constants/routes";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-dark-bg via-dark-secondary to-primary">
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-16 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl"></div>

          <div className="relative text-center px-8 py-20">
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-white text-sm">
              Join Thousands of Happy Customers
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-8">
              Ready to Upgrade Your Shopping Experience?
            </h2>

            <p className="text-slate-300 text-lg max-w-2xl mx-auto mt-6 leading-8">
              Discover thousands of premium products at unbeatable prices with
              secure payments and fast delivery across the country.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
              <Link
                href={`${PRODUCT_ROUTE}`}
                className="bg-accent text-dark-bg font-semibold px-8 py-4 rounded-xl hover:scale-105 transition duration-300"
              >
                Shop Now
              </Link>

              <Link
                href={`${CONTACT_ROUTE}`}
                className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-dark-bg transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

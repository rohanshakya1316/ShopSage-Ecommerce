export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Shopping Made Simple & Reliable
          </h2>

          <p className="text-slate-600 mt-5 max-w-2xl mx-auto">
            At ShopSage, we combine quality products, secure transactions, and
            exceptional customer service to deliver the best online shopping
            experience.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-indigo-100 rounded-full text-3xl">
              🚚
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6">
              Fast Delivery
            </h3>

            <p className="text-slate-600 mt-3">
              Quick and reliable shipping to ensure your orders arrive on time.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-100 rounded-full text-3xl">
              🔒
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6">
              Secure Payments
            </h3>

            <p className="text-slate-600 mt-3">
              Protected payment methods with advanced security standards.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-amber-100 rounded-full text-3xl">
              ↩️
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6">
              Easy Returns
            </h3>

            <p className="text-slate-600 mt-3">
              Hassle-free return and refund policies for customer satisfaction.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-pink-100 rounded-full text-3xl">
              🎧
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6">
              24/7 Support
            </h3>

            <p className="text-slate-600 mt-3">
              Our dedicated support team is available whenever you need help.
            </p>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Trusted by Thousands of Happy Customers
          </h3>

          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            More than 50,000 shoppers choose ShopSage for quality products,
            secure shopping, and exceptional customer experiences.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            <div>
              <h4 className="text-3xl font-bold">50K+</h4>
              <p className="text-indigo-100">Customers</p>
            </div>

            <div>
              <h4 className="text-3xl font-bold">10K+</h4>
              <p className="text-indigo-100">Products</p>
            </div>

            <div>
              <h4 className="text-3xl font-bold">99%</h4>
              <p className="text-indigo-100">Satisfaction</p>
            </div>

            <div>
              <h4 className="text-3xl font-bold">24/7</h4>
              <p className="text-indigo-100">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
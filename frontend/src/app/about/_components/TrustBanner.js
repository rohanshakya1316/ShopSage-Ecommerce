import { trustBanner } from "@/constants/about";

const TrustBanner = () => {
  return (
    <section className="py-1 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mt-4 mb-4 bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Trusted by Thousands of Happy Customers
          </h3>
          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            More than 50,000 shoppers choose ShopSage for quality products,
            secure shopping, and exceptional customer experiences.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {trustBanner.map((trust, index) => (
              <div key={index}>
                <h4 className="text-3xl font-bold">{trust.values}</h4>
                <p className="text-indigo-100">{trust.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;

import { features } from "@/constants/about";

const WhyChooseUs = () => {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-wider">
            Why ShopSage
          </span>

          <h2 className="text-4xl font-bold text-heading mt-3">
            Why Choose Us?
          </h2>

          <p className="text-body max-w-2xl mx-auto mt-4">
            We make online shopping simple, secure, and enjoyable by combining
            premium products with exceptional customer service.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-md border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-heading mt-6">
                {feature.title}
              </h3>

              <p className="text-body mt-4 leading-7">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

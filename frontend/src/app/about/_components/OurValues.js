import { values } from "@/constants/about";

const OurValues = () => {
  return (
    <section className="mt-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-wider">
            Our Values
          </span>

          <h2 className="text-4xl font-bold text-heading mt-3">
            What Drives ShopSage
          </h2>

          <p className="text-body mt-4 max-w-2xl mx-auto">
            Our values shape every experience we create for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-dark-bg text-2xl font-bold">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold text-heading mt-6">
                {value.title}
              </h3>

              <p className="text-body mt-4 leading-7">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;

const flashProducts = [
  {
    id: 1,
    name: "Gaming Headset",
    image: "https://picsum.photos/400/300?random=11",
    discount: "-50%",
    description: "High-quality surround sound",
    price: "$49",
    oldPrice: "$99",
  },
  {
    id: 2,
    name: "Smartphone Case",
    image: "https://picsum.photos/400/300?random=12",
    discount: "-40%",
    description: "Shockproof premium design",
    price: "$15",
    oldPrice: "$25",
  },
  {
    id: 3,
    name: "Fitness Smart Band",
    image: "https://picsum.photos/400/300?random=13",
    discount: "-35%",
    description: "Track your health easily",
    price: "$39",
    oldPrice: "$60",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    image: "https://picsum.photos/400/300?random=14",
    discount: "-60%",
    description: "Smooth performance",
    price: "$19",
    oldPrice: "$49",
  },
];

export default function FlashSale() {
  return (
    <section id="deals" className="py-20 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <span className="text-amber-400 font-semibold uppercase tracking-wider">
              ⚡ Limited Time Offer
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Flash Sale is Live!
            </h2>

            <p className="text-slate-300 mt-4 max-w-xl">
              Grab your favorite products before the deal ends. Massive
              discounts available for a short time only.
            </p>
          </div>

          {/* Countdown */}
          <div className="flex gap-4 text-center">
            <div className="bg-white/10 px-5 py-3 rounded-xl">
              <h3 className="text-2xl font-bold">02</h3>
              <p className="text-xs text-slate-300">Days</p>
            </div>

            <div className="bg-white/10 px-5 py-3 rounded-xl">
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-xs text-slate-300">Hours</p>
            </div>

            <div className="bg-white/10 px-5 py-3 rounded-xl">
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-xs text-slate-300">Minutes</p>
            </div>

            <div className="bg-amber-500 text-slate-900 px-5 py-3 rounded-xl font-bold flex items-center">
              SALE ENDING
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden text-slate-900 shadow-xl group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
                />

                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  {item.discount}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg">{item.name}</h3>

                <p className="text-slate-500 text-sm mt-1">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xl font-bold text-indigo-600">
                    {item.price}
                  </span>

                  <span className="line-through text-slate-400">
                    {item.oldPrice}
                  </span>
                </div>

                <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
                  Grab Deal
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="text-center mt-12">
          <button className="bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-500 transition">
            View All Flash Deals
          </button>
        </div>
      </div>
    </section>
  );
}
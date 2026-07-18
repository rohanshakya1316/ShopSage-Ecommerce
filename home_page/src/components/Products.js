const products = [
  {
    id: 1,
    category: "Electronics",
    name: "Smart Watch Pro",
    image: "https://picsum.photos/400/300?random=1",
    price: "$199",
    oldPrice: "$249",
    rating: "★★★★★",
  },
  {
    id: 2,
    category: "Fashion",
    name: "Premium Hoodie",
    image: "https://picsum.photos/400/300?random=2",
    price: "$59",
    oldPrice: "$79",
    rating: "★★★★☆",
  },
  {
    id: 3,
    category: "Accessories",
    name: "Wireless Earbuds",
    image: "https://picsum.photos/400/300?random=3",
    price: "$89",
    oldPrice: "$120",
    rating: "★★★★★",
  },
  {
    id: 4,
    category: "Home",
    name: "Smart Lamp",
    image: "https://picsum.photos/400/300?random=4",
    price: "$49",
    oldPrice: "$65",
    rating: "★★★★☆",
  },
  {
    id: 5,
    category: "Electronics",
    name: "Gaming Mouse",
    image: "https://picsum.photos/400/300?random=5",
    price: "$39",
    oldPrice: "$55",
    rating: "★★★★★",
  },
  {
    id: 6,
    category: "Fashion",
    name: "Leather Jacket",
    image: "https://picsum.photos/400/300?random=6",
    price: "$149",
    oldPrice: "$199",
    rating: "★★★★★",
  },
  {
    id: 7,
    category: "Accessories",
    name: "Travel Backpack",
    image: "https://picsum.photos/400/300?random=7",
    price: "$79",
    oldPrice: "$99",
    rating: "★★★★☆",
  },
  {
    id: 8,
    category: "Home",
    name: "Coffee Maker",
    image: "https://picsum.photos/400/300?random=8",
    price: "$129",
    oldPrice: "$169",
    rating: "★★★★★",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold uppercase tracking-wider">
            Our Products
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Trending Products
          </h2>

          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Explore our latest collection of premium products carefully selected
            for quality, style, and performance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="p-5">
                <span className="text-sm text-slate-500">
                  {product.category}
                </span>

                <h3 className="text-lg font-bold text-slate-800 mt-2">
                  {product.name}
                </h3>

                <div className="text-amber-400 mt-2">
                  {product.rating}
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-bold text-indigo-600">
                    {product.price}
                  </span>

                  <span className="line-through text-slate-400">
                    {product.oldPrice}
                  </span>
                </div>

                <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
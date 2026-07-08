import ReactMarkdown from "react-markdown";
import { Star } from "lucide-react";

async function getProduct(id) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error(`Failed to fetch product (status ${res.status})`);
  }

  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  const images = product.imageUrls?.length
    ? product.imageUrls
    : ["/placeholder.png"];
  const lowStock = product.stock !== undefined && product.stock < 10;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-3">
          <div className="relative bg-gray-50 rounded-2xl h-96 md:h-[28rem] flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src={images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {lowStock && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Only {product.stock} left
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.slice(0, 5).map((img, i) => (
                <div
                  key={i}
                  className="h-20 w-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 shrink-0"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="bg-sky-500 text-white text-xs font-medium px-3 py-1 rounded-full w-fit">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold mt-4">{product.name}</h1>

          <div className="flex items-center gap-1 text-amber-400 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-gray-400 text-sm ml-1">(24 reviews)</span>
          </div>

          <p className="text-gray-500 mt-3">
            Brand:{" "}
            <span className="font-medium text-gray-800">{product.brand}</span>
          </p>

          <p className="text-orange-600 text-3xl font-bold mt-4">
            Rs. {product.price.toLocaleString()}
          </p>

          <p
            className={`text-sm mt-2 font-medium ${lowStock ? "text-red-500" : "text-green-600"}`}
          >
            {product.stock > 0
              ? `In stock: ${product.stock} units`
              : "Out of stock"}
          </p>

          <hr className="my-5 border-gray-200" />

          <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2">
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </div>

          <div className="flex gap-3 mt-8">
            <button className="flex-1 bg-orange-500 text-white font-medium py-3 rounded-full hover:bg-orange-600 active:scale-95 transition-all shadow-sm hover:shadow-md">
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 font-medium py-3 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

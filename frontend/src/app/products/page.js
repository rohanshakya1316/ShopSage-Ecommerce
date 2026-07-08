import Banner from "./_components/Banner";
import Card from "./_components/Card";

async function getProducts() {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Banner />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold">Featured products</h2>
          <p className="text-sm text-gray-500">
            {products.length} items available
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-7">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

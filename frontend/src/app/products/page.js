import Banner from "./_components/Banner";
import Card from "./_components/Card";
import Filters from "./_components/Filters";

async function getProducts(searchParams) {
  const params = new URLSearchParams();

  if (searchParams.sort) params.set("sort", searchParams.sort);
  if (searchParams.min) params.set("min", searchParams.min);
  if (searchParams.max) params.set("max", searchParams.max);
  if (searchParams.category) params.set("category", searchParams.category);
  if (searchParams.brands) params.set("brands", searchParams.brands);
  if (searchParams.name) params.set("name", searchParams.name);

  const res = await fetch(
    `http://localhost:5000/api/products?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function getBrandsAndCategories() {
  const [brandsRes, categoriesRes] = await Promise.all([
    fetch("http://localhost:5000/api/products/brands", { cache: "no-store" }),
    fetch("http://localhost:5000/api/products/categories", {
      cache: "no-store",
    }),
  ]);

  const brands = brandsRes.ok ? await brandsRes.json() : [];
  const categories = categoriesRes.ok ? await categoriesRes.json() : [];

  return { brands, categories };
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const products = await getProducts(params);
  const { brands, categories } = await getBrandsAndCategories();

  return (
    <>
      <Banner />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-heading">Featured products</h2>
          <p className="text-sm text-muted">
            {products.length} items available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <Filters brands={brands} categories={categories} />

        {products.length === 0 ? (
          <div className="text-center py-20 text-muted">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import Card from "../../_components/Card";

async function getRelatedProducts(category, currentId) {
  const res = await fetch(
    `http://localhost:5000/api/products?category=${encodeURIComponent(category)}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];

  const data = await res.json();
  const list = Array.isArray(data) ? data : data.products || [];

  return list.filter((p) => p._id !== currentId).slice(0, 3);
}

export default async function RelatedProducts({ category, currentId }) {
  const related = await getRelatedProducts(category, currentId);

  if (!related.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-heading mb-6">
        You may also like
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

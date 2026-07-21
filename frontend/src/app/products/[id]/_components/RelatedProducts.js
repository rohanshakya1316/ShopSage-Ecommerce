import { getRelatedProducts } from "@/api/products";
import ProductCard from "../../_components/ProductCard";

const RelatedProducts = async ({ category, currentId }) => {
  const related = await getRelatedProducts(category, currentId);

  if (!related.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-heading mb-6">
        You may also like
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

import { getProducts } from "@/api/products";
import ProductCard from "./_components/ProductCard";
export const metadata = {
  title: "Products",
};
const ProductPage = async () => {
  const products = await getProducts();

  return (
    <>
      <h2 className="text-3xl font-bold text-heading text-center p-4 mb-4">
        Featured Products
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard {...product} key={index} />
        ))}
      </section>
    </>
  );
};

export default ProductPage;

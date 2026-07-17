import { getBrands, getCategories, getProducts } from "@/api/products";
import ProductCard from "./_components/ProductCard";
import Filters from "./_components/Filters";
export const metadata = {
  title: "Products",
};
const ProductPage = async ({ searchParams }) => {
  const products = await getProducts(await searchParams);
  const brands = await getBrands();
  const categories = await getCategories();

  return (
    <>
      <h2 className="text-3xl font-bold text-heading text-center p-4 mb-4">
        Featured Products
      </h2>
      <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <Filters brands={brands} categories={categories} />

        {/* Products */}
        <div className="self-start grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductPage;

import ProductBanner from "./_components/ProductBanner";

const ProductLayout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-background text-body min-h-screen">
      <ProductBanner />
      <section className="py-12">{children}</section>
    </div>
  );
};

export default ProductLayout;

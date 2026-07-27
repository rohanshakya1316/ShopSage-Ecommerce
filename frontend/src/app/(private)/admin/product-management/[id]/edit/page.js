import { getProductById } from "@/api/products";
import BackButton from "@/components/BackButton";
import ProductForm from "../../_components/Form";

const ProductEditPage = async ({ params }) => {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <>
      <section className="min-h-screen bg-background py-6 px-4">
        <div className="max-w-6xl mx-auto bg-card rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between flex-row-reverse bg-primary px-8 py-8">
            <div>
              <BackButton />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">Update Product</h1>
              <p className="text-white/80 mt-2">
                Fill all required information before updating.
              </p>
            </div>
          </div>

          <ProductForm product={product} isEditing={true} />
        </div>
      </section>
    </>
  );
};

export default ProductEditPage;

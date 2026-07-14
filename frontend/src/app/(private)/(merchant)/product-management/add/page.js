import ProductForm from "../_components/Form";

export const metadata = {
  title: "Add Product",
};

const AddProductPage = () => {
  return (
    <>
      <section className="min-h-screen bg-background py-6 px-4">
        <div className="max-w-6xl mx-auto bg-card rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}

          <div className="bg-primary px-8 py-8">
            <h1 className="text-3xl font-bold text-white">Add New Product</h1>

            <p className="text-white/80 mt-2">
              Fill all required information before publishing.
            </p>
          </div>
          <ProductForm />
        </div>
      </section>
    </>
  );
};

export default AddProductPage;

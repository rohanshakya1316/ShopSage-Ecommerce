// src/app/product-management/add/page.js

import Form from "../_components/Form";

export const metadata = {
  title: "Add Product",
};

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Add Product</h1>
      <Form />
    </div>
  );
}
"use client";

import Image from "next/image";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import { addProduct, updateProduct } from "@/api/products";
import { toast } from "react-toastify";

const ProductForm = ({ product, isEditing = false }) => {
  const { register, handleSubmit, reset } = useForm({
    values: product,
  });

  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [localImageUrls, setLocalImageUrls] = useState([]);

  const prepareData = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    if (data.description) formData.append("description", data.description);

    if (productImages.length > 0) {
      productImages.map((image) => {
        formData.append("images", image);
      });
    }

    return formData;
  };

  const upsertProduct = async (input) => {
    if (isEditing) {
      return updateProduct(product._id, input);
    }

    return addProduct(input);
  };

  const submitForm = (data) => {
    setLoading(true);
    const input = prepareData(data);

    upsertProduct(input)
      .then((response) => {
        if (isEditing) {
          toast.success("Product Updated Successfully!");
        } else {
          toast.success("Product Added Successfully!");
          setProductImages([]);
          setLocalImageUrls([]);
          reset();
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="p-8">
      {/* Section */}

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-heading">
          Product Information
        </h2>

        <div className="h-1 w-20 bg-accent rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}

        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 font-semibold text-heading"
          >
            Product Name
            <span className="text-error ml-1">*</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter product name"
            {...register("name")}
            required
            className="w-full rounded-xl border border-gray-300 bg-background px-4 py-3 text-body placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition"
          />
        </div>

        {/* Brand */}

        <div>
          <label
            htmlFor="brand"
            className="block mb-2 font-semibold text-heading"
          >
            Brand
            <span className="text-error ml-1">*</span>
          </label>

          <input
            id="brand"
            type="text"
            placeholder="Apple"
            {...register("brand")}
            required
            className="w-full rounded-xl border border-gray-300 bg-background px-4 py-3 text-body placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition"
          />
        </div>

        {/* Price */}

        <div>
          <label
            htmlFor="price"
            className="block mb-2 font-semibold text-heading"
          >
            Price
            <span className="text-error ml-1">*</span>
          </label>

          <input
            id="price"
            type="number"
            placeholder="Rs. 5000"
            {...register("price")}
            required
            className="w-full rounded-xl border border-gray-300 bg-background px-4 py-3 text-body placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition"
          />
        </div>

        {/* Category */}

        <div>
          <label
            htmlFor="category"
            className="block mb-2 font-semibold text-heading"
          >
            Category
            <span className="text-error ml-1">*</span>
          </label>

          <input
            id="category"
            type="text"
            placeholder="Electronics"
            {...register("category")}
            required
            className="w-full rounded-xl border border-gray-300 bg-background px-4 py-3 text-body placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition"
          />
        </div>

        {/* Stock */}

        <div>
          <label
            htmlFor="stock"
            className="block mb-2 font-semibold text-heading"
          >
            Stock
            <span className="text-error ml-1">*</span>
          </label>

          <input
            id="stock"
            type="number"
            defaultValue={1}
            {...register("stock")}
            required
            className="w-full rounded-xl border border-gray-300 bg-background px-4 py-3 text-body placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition"
          />
        </div>
      </div>

      {/* Upload Section */}

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-heading mb-2">
          Product Images
        </h2>

        <div className="h-1 w-20 bg-accent rounded-full mb-6"></div>

        <label
          htmlFor="images"
          className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-background py-12 transition-all duration-300 hover:border-primary hover:bg-primary/5"
        >
          <CloudUpload className="h-14 w-14 text-accent transition group-hover:scale-110" />

          <h3 className="mt-4 text-lg font-semibold text-heading">
            Upload Images
          </h3>

          <p className="mt-2 text-body">Click to browse or drag & drop</p>

          <span className="text-sm text-muted mt-1">
            PNG • JPG • JPEG • WEBP
          </span>

          <input
            id="images"
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(event) => {
              const files = [];
              const urls = [];

              Array.from(event.target.files).forEach((file) => {
                files.push(file);
                urls.push(URL.createObjectURL(file));
              });

              setProductImages(files);
              setLocalImageUrls(urls);
            }}
          />
        </label>

        {localImageUrls.length > 0 && (
          <div className="flex flex-wrap gap-5 mt-6">
            {localImageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition hover:scale-105"
              >
                <Image
                  src={imageUrl}
                  alt="Preview"
                  width={120}
                  height={120}
                  className="w-28 h-28 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Description Section */}

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-heading mb-2">
          Product Description
        </h2>

        <div className="h-1 w-20 bg-accent rounded-full mb-6"></div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-heading"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={8}
            placeholder="Write a detailed description about your product..."
            {...register("description")}
            className="w-full rounded-xl border border-gray-300 bg-background px-4 py-3 text-body placeholder:text-muted resize-none transition outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Submit Button */}

      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-primary
                px-8
                py-3.5
                text-base
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:bg-primary-hover
                hover:shadow-2xl
                hover:-translate-y-0.5
                active:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
        >
          {loading ? (
            <>
              <Spinner className="h-4 w-4" />
              Saving Product...
            </>
          ) : (
            <>
              <CloudUpload className="h-5 w-5" />
              {isEditing ? "Update Product" : "Add Product"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

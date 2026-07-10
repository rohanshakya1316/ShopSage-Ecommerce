// src/app/product-management/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STORAGE_KEY = "products";
const CATEGORY_OPTIONS = [
    "Electronics",
    "Apparel & Accessories",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Stationery",
    "Other",
];

const baseInputClass =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition focus:ring-2 focus:ring-[#4F46E5]/20";
const inputBorder = (hasError) =>
    hasError ? "border-[#EF4444] focus:border-[#EF4444]" : "border-[#94A3B8]/40 focus:border-[#4F46E5]";

function Field({ label, htmlFor, error, required, children, className = "" }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label htmlFor={htmlFor} className="block text-sm font-medium text-[#0F172A]">
                {label}
                {required && <span className="ml-0.5 text-[#EF4444]">*</span>}
            </label>
            {children}
            {error && <p className="text-xs font-medium text-[#EF4444]">{error}</p>}
        </div>
    );
}

export default function EditProductPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [form, setForm] = useState(null); // null until loaded
    const [errors, setErrors] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) {
            setNotFound(true);
            return;
        }
        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const existing = products.find((p) => p.id === id);
            if (!existing) {
                setNotFound(true);
            } else {
                setForm(existing);
            }
        } catch {
            setNotFound(true);
        }
    }, [id]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleImageFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
        reader.readAsDataURL(file);
    };

    const validate = () => {
        const nextErrors = {};
        if (!form.name.trim()) nextErrors.name = "Product name is required.";
        if (!form.category) nextErrors.category = "Please select a category.";
        if (!form.price) nextErrors.price = "Price is required.";
        else if (Number(form.price) <= 0) nextErrors.price = "Price must be greater than 0.";
        if (form.stock === "") nextErrors.stock = "Stock quantity is required.";
        else if (Number(form.stock) < 0) nextErrors.stock = "Stock quantity can't be negative.";
        return nextErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setSaving(true);
        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const updated = products.map((p) =>
                p.id === id
                    ? {
                          ...p,
                          ...form,
                          price: Number(form.price),
                          discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
                          stock: Number(form.stock),
                          updatedAt: new Date().toISOString(),
                      }
                    : p
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            router.push("/product-management");
        } catch {
            setErrors((prev) => ({ ...prev, form: "Failed to save changes. Please try again." }));
            setSaving(false);
        }
    };

    if (notFound) {
        return (
            <div className="p-8 text-center">
                <p className="text-sm text-[#94A3B8]">Product not found.</p>
                <button
                    onClick={() => router.push("/product-management")}
                    className="mt-4 text-sm font-medium text-[#4F46E5] hover:underline"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    if (!form) {
        return <div className="p-8 text-center text-sm text-[#94A3B8]">Loading…</div>;
    }

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-xl font-semibold text-[#0F172A]">Edit Product</h1>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <Field label="Product Image">
                    <div className="flex items-center gap-4">
                        {form.image && (
                            <img src={form.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFile(e.target.files?.[0])}
                            className="text-sm"
                        />
                    </div>
                </Field>

                <Field label="Product Name" htmlFor="name" error={errors.name} required>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`${baseInputClass} ${inputBorder(errors.name)}`}
                    />
                </Field>

                <Field label="Category" htmlFor="category" error={errors.category} required>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={`${baseInputClass} ${inputBorder(errors.category)}`}
                    >
                        <option value="">Select a category</option>
                        {CATEGORY_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Brand" htmlFor="brand">
                    <input
                        id="brand"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        className={`${baseInputClass} ${inputBorder(false)}`}
                    />
                </Field>

                <Field label="Description" htmlFor="description">
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        className={`${baseInputClass} ${inputBorder(false)} resize-none`}
                    />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Price" htmlFor="price" error={errors.price} required>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={form.price}
                            onChange={handleChange}
                            className={`${baseInputClass} ${inputBorder(errors.price)}`}
                        />
                    </Field>

                    <Field label="Discount Price" htmlFor="discountPrice">
                        <input
                            id="discountPrice"
                            name="discountPrice"
                            type="number"
                            step="0.01"
                            value={form.discountPrice || ""}
                            onChange={handleChange}
                            className={`${baseInputClass} ${inputBorder(false)}`}
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Stock" htmlFor="stock" error={errors.stock} required>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            className={`${baseInputClass} ${inputBorder(errors.stock)}`}
                        />
                    </Field>

                    <Field label="SKU" htmlFor="sku">
                        <input
                            id="sku"
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className={`${baseInputClass} ${inputBorder(false)}`}
                        />
                    </Field>
                </div>

                {errors.form && <p className="text-sm text-[#EF4444]">{errors.form}</p>}

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] disabled:opacity-50"
                    >
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/product-management")}
                        className="rounded-lg border border-[#94A3B8]/40 bg-white px-5 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
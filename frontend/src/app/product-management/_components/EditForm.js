// src/app/product-management/_components/EditForm.js
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    STORAGE_KEY,
    MAX_DESCRIPTION_LENGTH,
    CATEGORY_OPTIONS,
    baseInputClass,
    inputBorder,
    generateSku,
    formatDate,
    Button,
    SectionCard,
    Field,
    ImageUploader,
    ConfirmationModal,
    Toast,
    ChecklistItem,
} from "./shared";

// Build the editable form state from a stored product record.
function toFormValues(product) {
    return {
        image: product.image || "",
        name: product.name || "",
        category: product.category || "",
        brand: product.brand || "",
        price: product.price ?? "",
        discountPrice: product.discountPrice ?? "",
        stock: product.stock ?? "",
        sku: product.sku || "",
        description: product.description || "",
    };
}

// =============================================================================
// <EditForm /> — view, update, and delete an existing product
// =============================================================================
export default function EditForm({ product, viewOnly = false }) {
    const router = useRouter();

    const [form, setForm] = useState(() => toFormValues(product));
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const isReadOnly = viewOnly;

    // ---------------------------------------------------------------------
    // Generic change handler shared by every text / number / select field
    // ---------------------------------------------------------------------
    const handleChange = ({ target }) => {
        if (isReadOnly) return;
        const { name, value } = target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ---------------------------------------------------------------------
    // Image handling: validate type + size, read as Base64, update preview
    // ---------------------------------------------------------------------
    const handleImageFile = (file) => {
        if (isReadOnly) return;

        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "Please upload a valid image file." }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
                ...prev,
                image: "Image is too large. Maximum size is 5MB.",
            }));
            return;
        }

        setErrors((prev) => ({ ...prev, image: "" }));

        const reader = new FileReader();

        reader.onload = () => {
            setForm((prev) => ({ ...prev, image: reader.result }));
            setFileName(file.name);
            setFileSize(file.size);
        };

        reader.onerror = () => {
            setErrors((prev) => ({
                ...prev,
                image: "Failed to read image. Please try again.",
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        if (isReadOnly) return;
        setForm((prev) => ({ ...prev, image: "" }));
        setFileName("");
        setFileSize(0);
    };

    // ---------------------------------------------------------------------
    // SKU regenerate
    // ---------------------------------------------------------------------
    const handleGenerateSku = () => {
        if (isReadOnly) return;
        setForm((prev) => ({ ...prev, sku: generateSku(prev.name || "product") }));
        setErrors((prev) => ({ ...prev, sku: "" }));
    };

    // ---------------------------------------------------------------------
    // Validation — same rules as the add form
    // ---------------------------------------------------------------------
    const validate = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Product name is required.";
        }

        if (!form.category) {
            nextErrors.category = "Please select a category.";
        }

        if (!form.price) {
            nextErrors.price = "Price is required.";
        } else if (Number(form.price) <= 0) {
            nextErrors.price = "Price must be greater than 0.";
        }

        if (form.discountPrice) {
            if (Number(form.discountPrice) < 0) {
                nextErrors.discountPrice = "Discount price can't be negative.";
            } else if (form.price && Number(form.discountPrice) >= Number(form.price)) {
                nextErrors.discountPrice = "Discount price must be less than the regular price.";
            }
        }

        if (form.stock === "") {
            nextErrors.stock = "Stock quantity is required.";
        } else if (Number(form.stock) < 0) {
            nextErrors.stock = "Stock quantity can't be negative.";
        }

        if (form.description.length > MAX_DESCRIPTION_LENGTH) {
            nextErrors.description = `Description must be under ${MAX_DESCRIPTION_LENGTH} characters.`;
        }

        return nextErrors;
    };

    // ---------------------------------------------------------------------
    // Checklist state — drives the sidebar progress list
    // ---------------------------------------------------------------------
    const checklist = useMemo(
        () => ({
            image: Boolean(form.image),
            basicInfo: Boolean(form.name.trim() && form.category),
            pricing: Boolean(form.price && Number(form.price) > 0 && form.stock !== ""),
        }),
        [form.image, form.name, form.category, form.price, form.stock]
    );

    // ---------------------------------------------------------------------
    // Update flow: validate -> open confirmation -> persist on confirm
    // ---------------------------------------------------------------------
    const handleUpdateClick = (e) => {
        e.preventDefault();
        if (isReadOnly) return;

        const nextErrors = validate();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            const firstErrorField = document.getElementById(Object.keys(nextErrors)[0]);
            firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        setUpdateModalOpen(true);
    };

    const confirmUpdate = () => {
        setLoading(true);

        const updatedProduct = {
            ...product,
            image: form.image,
            name: form.name.trim(),
            category: form.category,
            brand: form.brand.trim(),
            price: Number(form.price),
            discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
            stock: Number(form.stock),
            sku: form.sku.trim() || generateSku(form.name),
            description: form.description.trim(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const nextProducts = products.map((p) => (p.id === product.id ? updatedProduct : p));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
            setUpdateModalOpen(false);
            setToast("Product updated successfully");
            setTimeout(() => router.push("/product-management"), 900);
        } catch {
            setUpdateModalOpen(false);
            setLoading(false);
            setErrors((prev) => ({
                ...prev,
                form: "Something went wrong while saving. Please try again.",
            }));
        }
    };

    // ---------------------------------------------------------------------
    // Delete flow
    // ---------------------------------------------------------------------
    const confirmDelete = () => {
        setLoading(true);
        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const nextProducts = products.filter((p) => p.id !== product.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
            setDeleteModalOpen(false);
            setToast("Product deleted");
            setTimeout(() => router.push("/product-management"), 700);
        } catch {
            setDeleteModalOpen(false);
            setLoading(false);
            setErrors((prev) => ({
                ...prev,
                form: "Something went wrong while deleting. Please try again.",
            }));
        }
    };

    const descriptionCount = form.description.length;

    return (
        <>
            <form onSubmit={handleUpdateClick} noValidate className="pb-24 sm:pb-0">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                    {/* ============================= Main column ============================= */}
                    <div className="space-y-6">
                        {/* Product Image */}
                        <SectionCard
                            title="Product Image"
                            description={isReadOnly ? "The image on file for this product." : "A clear photo helps customers recognize your product."}
                            icon={
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                        >
                            <ImageUploader
                                image={form.image}
                                fileName={fileName}
                                fileSize={fileSize}
                                onFile={handleImageFile}
                                onRemove={handleRemoveImage}
                                error={errors.image}
                                disabled={isReadOnly}
                            />
                        </SectionCard>

                        {/* General Information */}
                        <SectionCard
                            title="General Information"
                            description="The basics customers see first."
                            icon={
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Product Name" htmlFor="name" error={errors.name} required className="sm:col-span-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        disabled={isReadOnly}
                                        placeholder="e.g. Wireless Over-Ear Headphones"
                                        aria-invalid={!!errors.name}
                                        aria-required="true"
                                        className={`${baseInputClass} ${inputBorder(errors.name)}`}
                                    />
                                </Field>

                                <Field label="Category" htmlFor="category" error={errors.category} required>
                                    <select
                                        id="category"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        disabled={isReadOnly}
                                        aria-invalid={!!errors.category}
                                        aria-required="true"
                                        className={`${baseInputClass} ${inputBorder(errors.category)} appearance-none`}
                                    >
                                        <option value="">Select a category</option>
                                        {CATEGORY_OPTIONS.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Brand" htmlFor="brand" error={errors.brand} hint="Optional">
                                    <input
                                        id="brand"
                                        name="brand"
                                        type="text"
                                        value={form.brand}
                                        onChange={handleChange}
                                        disabled={isReadOnly}
                                        placeholder="e.g. Acme Audio"
                                        className={`${baseInputClass} ${inputBorder(errors.brand)}`}
                                    />
                                </Field>

                                <Field
                                    label="Description"
                                    htmlFor="description"
                                    error={errors.description}
                                    hint={`${descriptionCount}/${MAX_DESCRIPTION_LENGTH} characters`}
                                    className="sm:col-span-2"
                                >
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        value={form.description}
                                        onChange={handleChange}
                                        disabled={isReadOnly}
                                        placeholder="Describe materials, features, sizing, and anything customers should know…"
                                        maxLength={MAX_DESCRIPTION_LENGTH}
                                        aria-invalid={!!errors.description}
                                        className={`${baseInputClass} ${inputBorder(errors.description)} resize-none`}
                                    />
                                </Field>
                            </div>
                        </SectionCard>

                        {/* Pricing & Inventory */}
                        <SectionCard
                            title="Pricing & Inventory"
                            description="What you charge and what you have in stock."
                            icon={
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM10.75 4.75a.75.75 0 00-1.5 0v.512c-.427.05-.834.16-1.2.328-.762.35-1.395.98-1.395 1.898 0 .919.633 1.548 1.395 1.898.366.168.773.278 1.2.328v2.614a3.13 3.13 0 01-.736-.363 2.278 2.278 0 01-.353-.325.75.75 0 10-1.15.966c.234.28.51.512.816.696.42.253.899.4 1.423.44v.514a.75.75 0 001.5 0v-.514c.552-.052 1.06-.216 1.494-.494.762-.487 1.256-1.21 1.256-2.033 0-.822-.494-1.545-1.256-2.033-.434-.278-.942-.442-1.494-.494V7.807c.278.048.535.144.75.28.148.093.272.202.371.32a.75.75 0 101.146-.966 3.207 3.207 0 00-.75-.643c-.416-.26-.902-.42-1.517-.472V4.75z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Price" htmlFor="price" error={errors.price} required>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-base text-[#94A3B8]">$</span>
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={form.price}
                                            onChange={handleChange}
                                            disabled={isReadOnly}
                                            placeholder="0.00"
                                            aria-invalid={!!errors.price}
                                            aria-required="true"
                                            className={`${baseInputClass} ${inputBorder(errors.price)} pl-7`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Discount Price" htmlFor="discountPrice" error={errors.discountPrice} hint="Optional">
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-base text-[#94A3B8]">$</span>
                                        <input
                                            id="discountPrice"
                                            name="discountPrice"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={form.discountPrice}
                                            onChange={handleChange}
                                            disabled={isReadOnly}
                                            placeholder="0.00"
                                            aria-invalid={!!errors.discountPrice}
                                            className={`${baseInputClass} ${inputBorder(errors.discountPrice)} pl-7`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Stock Quantity" htmlFor="stock" error={errors.stock} required>
                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={form.stock}
                                        onChange={handleChange}
                                        disabled={isReadOnly}
                                        placeholder="0"
                                        aria-invalid={!!errors.stock}
                                        aria-required="true"
                                        className={`${baseInputClass} ${inputBorder(errors.stock)}`}
                                    />
                                </Field>

                                <Field label="SKU" htmlFor="sku" error={errors.sku} hint="Optional — auto-generated if left blank">
                                    <div className="flex gap-2">
                                        <input
                                            id="sku"
                                            name="sku"
                                            type="text"
                                            value={form.sku}
                                            onChange={handleChange}
                                            disabled={isReadOnly}
                                            placeholder="e.g. WH-AC102"
                                            className={`${baseInputClass} ${inputBorder(errors.sku)}`}
                                        />
                                        {!isReadOnly && (
                                            <Button type="button" variant="secondary" size="md" onClick={handleGenerateSku} aria-label="Generate SKU">
                                                Generate
                                            </Button>
                                        )}
                                    </div>
                                </Field>
                            </div>
                        </SectionCard>

                        {/* Form-level error */}
                        {errors.form && (
                            <p className="rounded-lg bg-[#EF4444]/10 p-3 text-base text-[#EF4444]" role="alert">
                                {errors.form}
                            </p>
                        )}
                    </div>

                    {/* ============================= Sidebar ============================= */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        {/* Meta info */}
                        <SectionCard title="Product Info">
                            <dl className="space-y-2 text-base">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-[#94A3B8]">Added on</dt>
                                    <dd className="font-medium text-[#0F172A]">{formatDate(product.createdAt)}</dd>
                                </div>
                                {product.updatedAt && (
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-[#94A3B8]">Last updated</dt>
                                        <dd className="font-medium text-[#0F172A]">{formatDate(product.updatedAt)}</dd>
                                    </div>
                                )}
                            </dl>
                        </SectionCard>

                        {/* Checklist */}
                        <SectionCard title="Checklist" description="Track what's ready to publish.">
                            <ul className="space-y-2.5">
                                <ChecklistItem done={checklist.image} label="Image uploaded" />
                                <ChecklistItem done={checklist.basicInfo} label="Basic info complete" />
                                <ChecklistItem done={checklist.pricing} label="Pricing & stock set" />
                            </ul>
                        </SectionCard>

                        {/* Actions */}
                        <SectionCard title={isReadOnly ? "Actions" : "Save changes"}>
                            <div className="hidden flex-col gap-3 sm:flex">
                                {isReadOnly ? (
                                    <Button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => router.push(`/product-management/${product.id}/edit`)}
                                        className="w-full"
                                    >
                                        Edit Product
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading ? "Updating…" : "Update Product"}
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    variant="danger"
                                    disabled={loading}
                                    onClick={() => setDeleteModalOpen(true)}
                                    className="w-full"
                                >
                                    Delete Product
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={loading}
                                    onClick={() => router.push("/product-management")}
                                    className="w-full"
                                >
                                    Back to list
                                </Button>
                            </div>
                            {!isReadOnly && (
                                <p className="text-sm text-[#94A3B8] sm:mt-1">
                                    Changes apply immediately once confirmed.
                                </p>
                            )}
                        </SectionCard>
                    </aside>
                </div>
            </form>

            {/* Sticky mobile action bar */}
            <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-[#94A3B8]/20 bg-white/95 p-3 backdrop-blur sm:hidden">
                <Button
                    type="button"
                    variant="danger"
                    size="md"
                    disabled={loading}
                    onClick={() => setDeleteModalOpen(true)}
                    className="flex-1"
                >
                    Delete
                </Button>
                {isReadOnly ? (
                    <Button
                        type="button"
                        size="md"
                        disabled={loading}
                        onClick={() => router.push(`/product-management/${product.id}/edit`)}
                        className="flex-1"
                    >
                        Edit
                    </Button>
                ) : (
                    <Button type="button" size="md" disabled={loading} onClick={handleUpdateClick} className="flex-1">
                        {loading ? "Updating…" : "Update"}
                    </Button>
                )}
            </div>

            {/* Update confirmation */}
            <ConfirmationModal
                open={updateModalOpen}
                title="Update Product?"
                message="Do you want to save these changes to the product?"
                confirmLabel="Update Product"
                cancelLabel="Cancel"
                variant="primary"
                onConfirm={confirmUpdate}
                onCancel={() => setUpdateModalOpen(false)}
            />

            {/* Delete confirmation */}
            <ConfirmationModal
                open={deleteModalOpen}
                title="Delete Product?"
                message={`Are you sure you want to delete "${product.name}"? This can't be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                variant="danger"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
            />

            {/* Success toast */}
            {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </>
    );
}
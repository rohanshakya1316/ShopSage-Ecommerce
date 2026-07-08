// src/app/product-management/_components/Form.js
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "products";

// ---------------------------------------------------------------------------
// Initial form state & field configuration
// Extend FIELDS with new entries (e.g. category, brand, stock) to grow the form.
// ---------------------------------------------------------------------------
const initialValues = {
    name: "",
    description: "",
    price: "",
    image: "",
};

const FIELDS = [
    {
        name: "name",
        label: "Product Name",
        type: "text",
        placeholder: "Wireless Headphones",
        required: true,
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter product description",
    },
    {
        name: "price",
        label: "Price ($)",
        type: "number",
        placeholder: "0.00",
        min: 0,
        step: 0.01,
        required: true,
    },
];

const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

// ---------------------------------------------------------------------------
// Reusable Field wrapper: label + error slot for any input
// ---------------------------------------------------------------------------
function Field({ label, htmlFor, error, children }) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-xs font-medium text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Image uploader: drag & drop, preview, replace, remove, filename display
// ---------------------------------------------------------------------------
function ImageUploader({ image, fileName, onFile, onRemove, error }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) onFile(file);
        },
        [onFile]
    );

    return (
        <Field label="Product Image" htmlFor="product-image" error={error}>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center gap-4 rounded-lg border-2 border-dashed p-4 transition sm:flex-row ${
                    isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-50"
                }`}
            >
                {/* Preview / Placeholder */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border bg-gray-100">
                    {image ? (
                        <>
                            <img
                                src={image}
                                alt="Product preview"
                                className="h-full w-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={onRemove}
                                aria-label="Remove image"
                                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white transition hover:bg-black/80"
                            >
                                ×
                            </button>
                        </>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="h-8 w-8"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.25v-.75A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5v-.75"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 8.625a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
                                />
                            </svg>
                            <span className="text-[10px]">Preview</span>
                        </div>
                    )}
                </div>

                {/* Upload controls */}
                <div className="flex w-full flex-col gap-2">
                    <label
                        htmlFor="product-image"
                        className="inline-flex w-fit cursor-pointer items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                    >
                        {image ? "Change Image" : "Choose Image"}
                        <input
                            id="product-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onFile(file);
                                e.target.value = "";
                            }}
                            className="sr-only"
                        />
                    </label>

                    <p className="text-xs text-gray-500">
                        {fileName
                            ? `Selected: ${fileName}`
                            : "Drag & drop an image here, or click to browse"}
                    </p>
                </div>
            </div>
        </Field>
    );
}

export default function Form() {
    const router = useRouter();

    const [form, setForm] = useState(initialValues);
    const [fileName, setFileName] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // -------------------------------------------------------------------
    // Single generic change handler for all text/number/textarea fields
    // -------------------------------------------------------------------
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // -------------------------------------------------------------------
    // Image handling: validate type, read as Base64, update preview
    // -------------------------------------------------------------------
    const handleImageFile = (file) => {
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "Please upload a valid image." }));
            return;
        }

        setErrors((prev) => ({ ...prev, image: "" }));

        const reader = new FileReader();

        reader.onload = () => {
            setForm((prev) => ({ ...prev, image: reader.result }));
            setFileName(file.name);
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
        setForm((prev) => ({ ...prev, image: "" }));
        setFileName("");
    };

    // -------------------------------------------------------------------
    // Validation
    // -------------------------------------------------------------------
    const validate = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Product name is required.";
        }

        if (!form.price) {
            nextErrors.price = "Price is required.";
        } else if (Number(form.price) <= 0) {
            nextErrors.price = "Price must be greater than 0.";
        }

        setErrors((prev) => ({ ...prev, ...nextErrors }));
        return Object.keys(nextErrors).length === 0;
    };

    // -------------------------------------------------------------------
    // Submit: persist to localStorage, then navigate back to list
    // -------------------------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        const product = {
            id: crypto.randomUUID(),
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            image: form.image,
            createdAt: new Date().toISOString(),
        };

        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            localStorage.setItem(STORAGE_KEY, JSON.stringify([product, ...products]));
            router.push("/product-management");
        } catch {
            setErrors((prev) => ({
                ...prev,
                form: "Something went wrong while saving. Please try again.",
            }));
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto max-w-xl space-y-6 rounded-xl bg-white p-8 shadow"
        >
            {/* Image Upload */}
            <ImageUploader
                image={form.image}
                fileName={fileName}
                onFile={handleImageFile}
                onRemove={handleRemoveImage}
                error={errors.image}
            />

            {/* Dynamic Fields */}
            {FIELDS.map((field) => (
                <Field
                    key={field.name}
                    label={field.label}
                    htmlFor={field.name}
                    error={errors[field.name]}
                >
                    {field.type === "textarea" ? (
                        <textarea
                            id={field.name}
                            rows={4}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            aria-invalid={!!errors[field.name]}
                            className={inputClass}
                        />
                    ) : (
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            min={field.min}
                            step={field.step}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            aria-invalid={!!errors[field.name]}
                            className={inputClass}
                        />
                    )}
                </Field>
            ))}

            {/* Form-level error */}
            {errors.form && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-600" role="alert">
                    {errors.form}
                </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg border px-5 py-2 transition hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </div>
        </form>
    );
}
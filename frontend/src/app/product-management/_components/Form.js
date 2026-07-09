// src/app/product-management/_components/Form.js
"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "products";
const MAX_IMAGE_MB = 5;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
const MAX_DESCRIPTION_LENGTH = 1000;


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

const initialValues = {
    image: "",
    name: "",
    category: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    description: "",
};

// Shared Tailwind class fragments so every input stays visually consistent.
const baseInputClass =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition focus:ring-2 focus:ring-[#4F46E5]/20";
const inputBorder = (hasError) =>
    hasError
        ? "border-[#EF4444] focus:border-[#EF4444]"
        : "border-[#94A3B8]/40 focus:border-[#4F46E5]";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateSku(name) {
    const prefix = name
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "-")
        .split("-")
        .filter(Boolean)
        .slice(0, 2)
        .join("-");
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    return prefix ? `${prefix}-${suffix}` : `SKU-${suffix}`;
}

// ---------------------------------------------------------------------------
// <Button /> — single reusable button with variant + size styling
// ---------------------------------------------------------------------------
const Button = forwardRef(function Button(
    { variant = "primary", size = "md", className = "", children, ...props },
    ref
) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const variants = {
        primary:
            "bg-[#4F46E5] text-white hover:bg-[#4338CA] focus-visible:ring-[#4F46E5] shadow-sm shadow-[#4F46E5]/20",
        secondary:
            "bg-white text-[#475569] border border-[#94A3B8]/40 hover:bg-[#F8FAFC] focus-visible:ring-[#4F46E5]",
        danger:
            "bg-white text-[#EF4444] border border-[#EF4444]/40 hover:bg-[#EF4444]/5 focus-visible:ring-[#EF4444]",
        dangerSolid:
            "bg-[#EF4444] text-white hover:bg-[#DC2626] focus-visible:ring-[#EF4444] shadow-sm shadow-[#EF4444]/20",
        ghost:
            "bg-transparent text-[#475569] hover:bg-[#F8FAFC] focus-visible:ring-[#4F46E5]",
    };

    return (
        <button
            ref={ref}
            className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
});

// ---------------------------------------------------------------------------
// <SectionCard /> — consistent white card wrapper for each form section
// ---------------------------------------------------------------------------
function SectionCard({ title, description, children, icon }) {
    return (
        <section className="rounded-xl border border-[#94A3B8]/20 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3">
                {icon && (
                    <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5]/10 text-[#4F46E5]"
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                )}
                <div>
                    <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
                    {description && (
                        <p className="mt-0.5 text-sm text-[#94A3B8]">{description}</p>
                    )}
                </div>
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// <Field /> — label + control + inline error/hint, shared by every input
// ---------------------------------------------------------------------------
function Field({ label, htmlFor, error, hint, required, className = "", children }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label htmlFor={htmlFor} className="block text-sm font-medium text-[#0F172A]">
                {label}
                {required && (
                    <span className="ml-0.5 text-[#EF4444]" aria-hidden="true">
                        *
                    </span>
                )}
            </label>
            {children}
            {error ? (
                <p className="flex items-center gap-1 text-xs font-medium text-[#EF4444]" role="alert">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.28 11.18c.75 1.334-.213 2.98-1.744 2.98H3.72c-1.53 0-2.493-1.646-1.743-2.98l6.28-11.18zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            ) : hint ? (
                <p className="text-xs text-[#94A3B8]">{hint}</p>
            ) : null}
        </div>
    );
}

// ---------------------------------------------------------------------------
// <ImageUploader /> — drag & drop, click-to-upload, preview, replace, remove
// ---------------------------------------------------------------------------
function ImageUploader({ image, fileName, fileSize, onFile, onRemove, error }) {
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);

    const validateAndRead = useCallback(
        (file) => {
            if (!file) return;
            onFile(file);
        },
        [onFile]
    );

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            dragCounter.current = 0;
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            validateAndRead(file);
        },
        [validateAndRead]
    );

    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current += 1;
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current <= 0) setIsDragging(false);
    };

    return (
        <Field label="Product Image" htmlFor="product-image" error={error}>
            <div
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="group"
                aria-label="Product image uploader"
                className={`flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-5 text-center transition sm:flex-row sm:text-left ${
                    isDragging
                        ? "border-[#4F46E5] bg-[#4F46E5]/5"
                        : error
                        ? "border-[#EF4444]/50 bg-[#EF4444]/5"
                        : "border-[#94A3B8]/40 bg-[#F8FAFC] hover:border-[#4F46E5]/50"
                }`}
            >
                {/* Preview / Placeholder */}
                <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-[#94A3B8]/30 bg-white sm:mx-0">
                    {image ? (
                        <>
                            <img src={image} alt="Product preview" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={onRemove}
                                aria-label="Remove image"
                                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F172A]/70 text-white transition hover:bg-[#EF4444] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-[#94A3B8]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="h-9 w-9"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.25v-.75A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5v-.75"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.625a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" />
                            </svg>
                            <span className="text-[10px] font-medium">No image</span>
                        </div>
                    )}
                </div>

                {/* Upload controls */}
                <div className="flex w-full flex-col items-center gap-2 sm:items-start">
                    <label
                        htmlFor="product-image"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#4F46E5]/10 px-4 py-2 text-sm font-medium text-[#4F46E5] transition hover:bg-[#4F46E5]/20 focus-within:ring-2 focus-within:ring-[#4F46E5]/30"
                    >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 101.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                        {image ? "Replace Image" : "Choose Image"}
                        <input
                            id="product-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                validateAndRead(file);
                                e.target.value = "";
                            }}
                            className="sr-only"
                        />
                    </label>

                    <p className="text-xs text-[#94A3B8]">
                        {fileName ? (
                            <>
                                <span className="font-medium text-[#475569]">{fileName}</span>
                                {fileSize ? ` · ${formatBytes(fileSize)}` : ""}
                            </>
                        ) : (
                            <>Drag &amp; drop, or click to browse. PNG / JPG up to {MAX_IMAGE_MB}MB.</>
                        )}
                    </p>

                    {image && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="text-xs font-medium text-[#EF4444] hover:underline"
                        >
                            Remove image
                        </button>
                    )}
                </div>
            </div>
        </Field>
    );
}

// ---------------------------------------------------------------------------
// <ConfirmationModal /> — generic accessible confirm/cancel dialog
// ---------------------------------------------------------------------------
function ConfirmationModal({
    open,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "primary",
    onConfirm,
    onCancel,
}) {
    const confirmRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        confirmRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            onClick={onCancel}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            >
                <h3 id="confirm-modal-title" className="text-lg font-semibold text-[#0F172A]">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button
                        ref={confirmRef}
                        variant={variant === "danger" ? "dangerSolid" : "primary"}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// <Toast /> — success notification, auto-dismisses
// ---------------------------------------------------------------------------
function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3200);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-[#0F172A] px-5 py-3.5 text-sm font-medium text-white shadow-xl sm:left-auto sm:right-6 sm:translate-x-0"
        >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/20 text-[#22C55E]">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
            {message}
        </div>
    );
}

// ---------------------------------------------------------------------------
// <ChecklistItem /> — small sidebar progress row
// ---------------------------------------------------------------------------
function ChecklistItem({ done, label }) {
    return (
        <li className="flex items-center gap-2 text-sm">
            <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-[#22C55E] text-white" : "bg-[#94A3B8]/20 text-transparent"
                }`}
                aria-hidden="true"
            >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                    <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
            <span className={done ? "text-[#0F172A]" : "text-[#94A3B8]"}>{label}</span>
        </li>
    );
}

// =============================================================================
// Main <Form /> component
// =============================================================================
export default function Form() {
    const router = useRouter();

    const [form, setForm] = useState(initialValues);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // ---------------------------------------------------------------------
    // Generic change handler shared by every text / number / select field
    // ---------------------------------------------------------------------
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ---------------------------------------------------------------------
    // Image handling: validate type + size, read as Base64, update preview
    // ---------------------------------------------------------------------
    const handleImageFile = (file) => {
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "Please upload a valid image file." }));
            return;
        }

        if (file.size > MAX_IMAGE_BYTES) {
            setErrors((prev) => ({
                ...prev,
                image: `Image is too large. Maximum size is ${MAX_IMAGE_MB}MB.`,
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
        setForm((prev) => ({ ...prev, image: "" }));
        setFileName("");
        setFileSize(0);
    };

    // ---------------------------------------------------------------------
    // SKU auto-suggest — only fills the field if the user hasn't typed one
    // ---------------------------------------------------------------------
    const handleGenerateSku = () => {
        setForm((prev) => ({ ...prev, sku: generateSku(prev.name || "product") }));
        setErrors((prev) => ({ ...prev, sku: "" }));
    };

    // ---------------------------------------------------------------------
    // Validation — returns an errors object; used both live and on submit
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
    // Save flow: validate -> open confirmation -> persist on confirm
    // ---------------------------------------------------------------------
    const handleSaveClick = (e) => {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            // Scroll the first invalid field into view for quick correction.
            const firstErrorField = document.getElementById(Object.keys(nextErrors)[0]);
            firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        setSaveModalOpen(true);
    };

    const confirmSave = () => {
        setLoading(true);

        const product = {
            id: crypto.randomUUID(),
            image: form.image,
            name: form.name.trim(),
            category: form.category,
            brand: form.brand.trim(),
            price: Number(form.price),
            discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
            stock: Number(form.stock),
            sku: form.sku.trim() || generateSku(form.name),
            description: form.description.trim(),
            createdAt: new Date().toISOString(),
        };

        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            localStorage.setItem(STORAGE_KEY, JSON.stringify([product, ...products]));
            setSaveModalOpen(false);
            setToast("Product added successfully");
            setTimeout(() => router.push("/product-management"), 900);
        } catch {
            setSaveModalOpen(false);
            setLoading(false);
            setErrors((prev) => ({
                ...prev,
                form: "Something went wrong while saving. Please try again.",
            }));
        }
    };

    // ---------------------------------------------------------------------
    // Delete / clear flow
    // ---------------------------------------------------------------------
    const confirmClear = () => {
        setForm(initialValues);
        setFileName("");
        setFileSize(0);
        setErrors({});
        setDeleteModalOpen(false);
    };

    const descriptionCount = form.description.length;

    return (
        <>
            <form onSubmit={handleSaveClick} noValidate className="pb-24 sm:pb-0">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                    {/* ============================= Main column ============================= */}
                    <div className="space-y-6">
                        {/* Product Images */}
                        <SectionCard
                            title="Product Image"
                            description="A clear photo helps customers recognize your product."
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
                            description="Set what you charge and what you have in stock."
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
                                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-[#94A3B8]">$</span>
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={form.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            aria-invalid={!!errors.price}
                                            aria-required="true"
                                            className={`${baseInputClass} ${inputBorder(errors.price)} pl-7`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Discount Price" htmlFor="discountPrice" error={errors.discountPrice} hint="Optional">
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-[#94A3B8]">$</span>
                                        <input
                                            id="discountPrice"
                                            name="discountPrice"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={form.discountPrice}
                                            onChange={handleChange}
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
                                            placeholder="e.g. WH-AC102"
                                            className={`${baseInputClass} ${inputBorder(errors.sku)}`}
                                        />
                                        <Button type="button" variant="secondary" size="md" onClick={handleGenerateSku} aria-label="Generate SKU">
                                            Generate
                                        </Button>
                                    </div>
                                </Field>
                            </div>
                        </SectionCard>

                        {/* Form-level error */}
                        {errors.form && (
                            <p className="rounded-lg bg-[#EF4444]/10 p-3 text-sm text-[#EF4444]" role="alert">
                                {errors.form}
                            </p>
                        )}
                    </div>

                    {/* ============================= Sidebar ============================= */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        {/* Checklist */}
                        <SectionCard title="Checklist" description="Track what's ready to publish.">
                            <ul className="space-y-2.5">
                                <ChecklistItem done={checklist.image} label="Image uploaded" />
                                <ChecklistItem done={checklist.basicInfo} label="Basic info complete" />
                                <ChecklistItem done={checklist.pricing} label="Pricing & stock set" />
                            </ul>
                        </SectionCard>

                        {/* Publish actions */}
                        <SectionCard title="Publish">
                            <div className="hidden flex-col gap-3 sm:flex">
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? "Saving…" : "Save Product"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="danger"
                                    disabled={loading}
                                    onClick={() => setDeleteModalOpen(true)}
                                    className="w-full"
                                >
                                    Delete / Clear Form
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={loading}
                                    onClick={() => router.back()}
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                            <p className="text-xs text-[#94A3B8] sm:mt-1">
                                Review the checklist above before publishing — you can always edit later.
                            </p>
                        </SectionCard>

                        {/* Photo tips */}
                        <SectionCard title="Photo tips">
                            <ul className="space-y-2 text-sm text-[#475569]">
                                <li className="flex gap-2">
                                    <span className="text-[#FBBF24]" aria-hidden="true">•</span>
                                    Use natural light and a plain background.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#FBBF24]" aria-hidden="true">•</span>
                                    Show the product from its most flattering angle.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#FBBF24]" aria-hidden="true">•</span>
                                    Square images (1:1) crop most consistently.
                                </li>
                            </ul>
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
                    Clear
                </Button>
                <Button type="button" size="md" disabled={loading} onClick={handleSaveClick} className="flex-1">
                    {loading ? "Saving…" : "Save Product"}
                </Button>
            </div>

            {/* Save confirmation */}
            <ConfirmationModal
                open={saveModalOpen}
                title="Add Product?"
                message="Do you want to add this product to your catalog?"
                confirmLabel="Add Product"
                cancelLabel="Cancel"
                variant="primary"
                onConfirm={confirmSave}
                onCancel={() => setSaveModalOpen(false)}
            />

            {/* Delete / clear confirmation */}
            <ConfirmationModal
                open={deleteModalOpen}
                title="Delete Product?"
                message="This will clear all entered information, including the uploaded image. This can't be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                variant="danger"
                onConfirm={confirmClear}
                onCancel={() => setDeleteModalOpen(false)}
            />

            {/* Success toast */}
            {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </>
    );
}
// src/app/product-management/_components/shared.js
"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

export const STORAGE_KEY = "products";
export const MAX_IMAGE_MB = 5;
export const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
export const MAX_DESCRIPTION_LENGTH = 1000;

export const CATEGORY_OPTIONS = [
    "Electronics",
    "Apparel & Accessories",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Stationery",
    "Other",
];

export const initialValues = {
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
export const baseInputClass =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition focus:ring-2 focus:ring-[#4F46E5]/20 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:text-[#64748B]";
export const inputBorder = (hasError) =>
    hasError
        ? "border-[#EF4444] focus:border-[#EF4444]"
        : "border-[#94A3B8]/40 focus:border-[#4F46E5]";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
export function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function generateSku(name) {
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

export function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ---------------------------------------------------------------------------
// <Button /> — single reusable button with variant + size styling
// ---------------------------------------------------------------------------
export const Button = forwardRef(function Button(
    { variant = "primary", size = "md", className = "", children, ...props },
    ref
) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
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
export function SectionCard({ title, description, children, icon }) {
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
                    <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
                    {description && (
                        <p className="mt-0.5 text-base text-[#94A3B8]">{description}</p>
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
export function Field({ label, htmlFor, error, hint, required, className = "", children }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label htmlFor={htmlFor} className="block text-base font-medium text-[#0F172A]">
                {label}
                {required && (
                    <span className="ml-0.5 text-[#EF4444]" aria-hidden="true">
                        *
                    </span>
                )}
            </label>
            {children}
            {error ? (
                <p className="flex items-center gap-1 text-sm font-medium text-[#EF4444]" role="alert">
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
                <p className="text-sm text-[#94A3B8]">{hint}</p>
            ) : null}
        </div>
    );
}

// ---------------------------------------------------------------------------
// <ImageUploader /> — drag & drop, click-to-upload, preview, replace, remove
// ---------------------------------------------------------------------------
export function ImageUploader({ image, fileName, fileSize, onFile, onRemove, error, disabled = false }) {
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);

    const validateAndRead = useCallback(
        (file) => {
            if (!file || disabled) return;
            onFile(file);
        },
        [onFile, disabled]
    );

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            dragCounter.current = 0;
            setIsDragging(false);
            if (disabled) return;
            const file = e.dataTransfer.files?.[0];
            validateAndRead(file);
        },
        [validateAndRead, disabled]
    );

    const handleDragEnter = (e) => {
        e.preventDefault();
        if (disabled) return;
        dragCounter.current += 1;
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        if (disabled) return;
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
                        : disabled
                        ? "border-[#94A3B8]/30 bg-[#F8FAFC]"
                        : "border-[#94A3B8]/40 bg-[#F8FAFC] hover:border-[#4F46E5]/50"
                }`}
            >
                {/* Preview / Placeholder */}
                <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-[#94A3B8]/30 bg-white sm:mx-0">
                    {image ? (
                        <>
                            <img src={image} alt="Product preview" className="h-full w-full object-cover" />
                            {!disabled && (
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
                            )}
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
                            <span className="text-xs font-medium">No image</span>
                        </div>
                    )}
                </div>

                {/* Upload controls */}
                {!disabled && (
                    <div className="flex w-full flex-col items-center gap-2 sm:items-start">
                        <label
                            htmlFor="product-image"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#4F46E5]/10 px-4 py-2 text-base font-medium text-[#4F46E5] transition hover:bg-[#4F46E5]/20 focus-within:ring-2 focus-within:ring-[#4F46E5]/30"
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

                        <p className="text-sm text-[#94A3B8]">
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
                                className="text-sm font-medium text-[#EF4444] hover:underline"
                            >
                                Remove image
                            </button>
                        )}
                    </div>
                )}

                {disabled && (
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                        <p className="text-sm text-[#94A3B8]">
                            {fileName ? (
                                <span className="font-medium text-[#475569]">{fileName}</span>
                            ) : (
                                "No image uploaded"
                            )}
                        </p>
                    </div>
                )}
            </div>
        </Field>
    );
}

// ---------------------------------------------------------------------------
// <ConfirmationModal /> — generic accessible confirm/cancel dialog
// ---------------------------------------------------------------------------
export function ConfirmationModal({
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
                <h3 id="confirm-modal-title" className="text-xl font-semibold text-[#0F172A]">
                    {title}
                </h3>
                <p className="mt-2 text-base text-[#475569]">{message}</p>

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
export function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3200);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-[#0F172A] px-5 py-3.5 text-base font-medium text-white shadow-xl sm:left-auto sm:right-6 sm:translate-x-0"
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
export function ChecklistItem({ done, label }) {
    return (
        <li className="flex items-center gap-2 text-base">
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
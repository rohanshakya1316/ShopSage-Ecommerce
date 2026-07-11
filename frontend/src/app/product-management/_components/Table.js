// src/app/product-management/_components/Table.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "products";
const PAGE_SIZE = 10;
const LOW_STOCK_THRESHOLD = 10;

function ConfirmationModal({ open, title, message, onConfirm, onCancel }) {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={onCancel}
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-base text-[#475569]">{message}</p>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-[#94A3B8]/40 bg-white px-5 py-2.5 text-base font-medium text-[#475569] hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-[#EF4444] px-5 py-2.5 text-base font-medium text-white hover:bg-[#DC2626]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

function Toast({ message, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#0F172A] px-5 py-3.5 text-base font-medium text-white shadow-xl sm:left-auto sm:right-6 sm:translate-x-0"
        >
            {message}
        </div>
    );
}

function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Table() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            setProducts(stored);
        } catch {
            setProducts([]);
        }
    }, []);

    const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
    const pageProducts = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return products.slice(start, start + PAGE_SIZE);
    }, [products, page]);

    const totalSales = useMemo(
        () => products.reduce((sum, p) => sum + (Number(p.price) || 0) * ((Number(p.stock) || 0) === 0 ? 0 : 1), 0),
        [products]
    );

    const handleDeleteConfirm = () => {
        if (!deleteTarget) return;
        const updated = products.filter((p) => p.id !== deleteTarget.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setProducts(updated);
        setDeleteTarget(null);
        setToast("Product deleted");
        // Keep pagination in range after deletion
        const newTotalPages = Math.max(1, Math.ceil(updated.length / PAGE_SIZE));
        if (page > newTotalPages) setPage(newTotalPages);
    };

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#94A3B8]/40 bg-white py-20 text-center">
                <p className="text-[#94A3B8]">No products yet.</p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-[#94A3B8]/20 bg-white shadow-sm">
                {/* Stats bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#94A3B8]/20 bg-[#F8FAFC] px-5 py-3">
                    <div className="flex items-center gap-6 text-base text-[#475569]">
                        <span>
                            All Products: <strong className="text-[#0F172A]">{products.length}</strong>
                        </span>
                        <span>
                            Total sales:{" "}
                            <strong className="text-[#0F172A]">
                                ${totalSales.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                            </strong>
                        </span>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-base">
                        <thead>
                            <tr className="border-b border-[#94A3B8]/20 bg-[#F8FAFC] text-left text-sm font-semibold uppercase tracking-wide text-[#64748B]">
                                <th className="px-5 py-3">Product</th>
                                <th className="px-5 py-3">Category</th>
                                <th className="px-5 py-3">Brand</th>
                                <th className="px-5 py-3">Price</th>
                                <th className="px-5 py-3">Stock</th>
                                <th className="px-5 py-3">Created At</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageProducts.map((product) => {
                                const stock = Number(product.stock) || 0;
                                const isLow = stock <= LOW_STOCK_THRESHOLD;
                                return (
                                    <tr
                                        key={product.id}
                                        className="border-b border-[#94A3B8]/10 last:border-0 hover:bg-[#F8FAFC]"
                                    >
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#94A3B8]/20 bg-[#F8FAFC]">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs text-[#94A3B8]">
                                                            N/A
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-[#0F172A]">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-[#EF4444]/10 px-2.5 py-1 text-sm font-medium text-[#EF4444]">
                                                {product.category || "—"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-[#475569]">{product.brand || "—"}</td>
                                        <td className="px-5 py-3 text-[#475569]">
                                            Rs. {Number(product.price || 0).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="flex items-center gap-2 text-[#475569]">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${
                                                        isLow ? "bg-[#EF4444]" : "bg-[#22C55E]"
                                                    }`}
                                                />
                                                {stock}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-[#475569]">{formatDate(product.createdAt)}</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() =>
                                                        router.push(`/product-management/${product.id}/edit?view=1`)
                                                    }
                                                    aria-label="View"
                                                    className="text-[#64748B] hover:text-[#0F172A]"
                                                >
                                                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                        <path d="M10 3.5c-4.14 0-7.5 3.5-7.5 6.5s3.36 6.5 7.5 6.5 7.5-3.5 7.5-6.5-3.36-6.5-7.5-6.5zm0 10.5a4 4 0 110-8 4 4 0 010 8z" />
                                                        <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/product-management/${product.id}/edit`)}
                                                    aria-label="Edit"
                                                    className="text-[#64748B] hover:text-[#4F46E5]"
                                                >
                                                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.5 8.5a2 2 0 01-.878.507l-3 .857a.5.5 0 01-.618-.618l.857-3a2 2 0 01.507-.878l8.5-8.5z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(product)}
                                                    aria-label="Delete"
                                                    className="text-[#64748B] hover:text-[#EF4444]"
                                                >
                                                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 2a1 1 0 00-1 1v1H4a1 1 0 000 2h.5l.545 9.03A2 2 0 007.038 17h5.924a2 2 0 001.993-2.97L15.5 6H16a1 1 0 100-2h-3V3a1 1 0 00-1-1H8zm1 5a1 1 0 112 0v6a1 1 0 11-2 0V7zm-2 0a1 1 0 00-1 1v5a1 1 0 102 0V8a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v5a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#94A3B8]/20 px-5 py-3">
                    <span className="text-sm text-[#94A3B8]">
                        Showing{" "}
                        <strong className="text-[#0F172A]">
                            {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, products.length)}
                        </strong>{" "}
                        of <strong className="text-[#0F172A]">{products.length}</strong>
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="rounded-md border border-[#94A3B8]/30 px-2.5 py-1.5 text-sm text-[#64748B] disabled:opacity-40"
                        >
                            ‹
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                            .reduce((acc, p, idx, arr) => {
                                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                                acc.push(p);
                                return acc;
                            }, [])
                            .map((p, idx) =>
                                p === "..." ? (
                                    <span key={`ellipsis-${idx}`} className="px-2 text-sm text-[#94A3B8]">
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                                            p === page
                                                ? "border border-[#0F172A] text-[#0F172A]"
                                                : "text-[#64748B] hover:bg-[#F8FAFC]"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="rounded-md border border-[#94A3B8]/30 px-2.5 py-1.5 text-sm text-[#64748B] disabled:opacity-40"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                open={!!deleteTarget}
                title="Delete Product?"
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This can't be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />

            {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </>
    );
}
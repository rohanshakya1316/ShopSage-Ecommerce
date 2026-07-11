// src/app/product-management/[id]/edit/page.js
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import EditForm from "../../_components/EditForm";
import { STORAGE_KEY } from "../../_components/shared";

function EditPageContent() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id;
    const viewOnly = searchParams.get("view") === "1";

    const [status, setStatus] = useState("loading"); // "loading" | "found" | "not-found"
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!id) {
            setStatus("not-found");
            return;
        }

        try {
            const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const found = products.find((p) => p.id === id);
            if (found) {
                setProduct(found);
                setStatus("found");
            } else {
                setStatus("not-found");
            }
        } catch {
            setStatus("not-found");
        }
    }, [id]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center py-24">
                <p className="text-base text-[#94A3B8]">Loading product…</p>
            </div>
        );
    }

    if (status === "not-found") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[#94A3B8]/40 bg-white py-20 text-center">
                <p className="text-[#94A3B8]">We couldn&apos;t find that product. It may have been deleted.</p>
                <button
                    type="button"
                    onClick={() => router.push("/product-management")}
                    className="rounded-lg bg-[#4F46E5] px-5 py-2.5 text-base font-medium text-white hover:bg-[#4338CA]"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0F172A]">
                        {viewOnly ? "View Product" : "Edit Product"}
                    </h1>
                    <p className="mt-0.5 text-base text-[#94A3B8]">
                        {viewOnly
                            ? "Reviewing details for this product."
                            : "Update the details below and save your changes."}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => router.push("/product-management")}
                    className="inline-flex items-center gap-1.5 text-base font-medium text-[#475569] hover:text-[#0F172A]"
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path
                            fillRule="evenodd"
                            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Products
                </button>
            </div>

            <EditForm product={product} viewOnly={viewOnly} />
        </div>
    );
}

export default function EditPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center py-24">
                    <p className="text-base text-[#94A3B8]">Loading product…</p>
                </div>
            }
        >
            <EditPageContent />
        </Suspense>
    );
}
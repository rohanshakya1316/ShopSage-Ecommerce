"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const DEFAULT_SORT = JSON.stringify({ createdAt: -1 });
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = "";
const DEFAULT_CATEGORY = "";
const DEFAULT_BRANDS = [];

const inputClass =
  "bg-background border border-slate-300 text-heading text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block w-full p-2.5 placeholder:text-muted";

const Filters = ({ brands, categories }) => {
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [categoryFilter, setCategoryFilter] = useState(DEFAULT_CATEGORY);
  const [brandsFilter, setBrandsFilter] = useState(DEFAULT_BRANDS);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();

  function applyFilters() {
    const params = new URLSearchParams();

    params.set("sort", sort);
    params.set("min", minPrice || 0);
    if (maxPrice) params.set("max", maxPrice);
    params.set("category", categoryFilter);
    params.set("brands", brandsFilter.join(","));
    params.set("name", search);

    router.push(`?${params.toString()}`);
    setMobileOpen(false);
  }

  function resetFilters() {
    setSort(DEFAULT_SORT);
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setCategoryFilter(DEFAULT_CATEGORY);
    setBrandsFilter(DEFAULT_BRANDS);
    setSearch("");
    router.replace("/products");
    setMobileOpen(false);
  }

  function handleBrandsFilter(brand) {
    setBrandsFilter((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand],
    );
  }

  const filterContent = (
    <>
      <div className="py-2">
        <h4 className="font-semibold text-heading text-sm mb-1">Search</h4>
        <input
          type="text"
          name="name"
          value={search}
          className={inputClass}
          placeholder="Search products..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <h3 className="font-bold text-lg mt-4 text-heading">Product Filters</h3>

      <div className="py-2">
        <h4 className="text-sm font-medium text-body mb-1">Sort by</h4>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className={inputClass}
        >
          <option value={JSON.stringify({ createdAt: -1 })}>
            Newest first
          </option>
          <option value={JSON.stringify({ price: 1 })}>Price: Low-High</option>
          <option value={JSON.stringify({ price: -1 })}>Price: High-Low</option>
          <option value={JSON.stringify({ name: 1 })}>Name: A-Z</option>
        </select>
      </div>

      <div className="py-2">
        <h4 className="text-sm font-medium text-body mb-1">Price range</h4>
        <label className="text-xs text-muted">Min price</label>
        <input
          type="number"
          name="min"
          value={minPrice}
          className={inputClass}
          placeholder="0"
          min={0}
          onChange={(event) => setMinPrice(event.target.value)}
        />
        <label className="text-xs text-muted mt-2 block">Max price</label>
        <input
          type="number"
          name="max"
          value={maxPrice}
          className={inputClass}
          placeholder="500000"
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </div>

      <div className="py-2">
        <h4 className="text-sm font-medium text-body mb-1">Category</h4>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className={inputClass}
        >
          <option value="">All categories</option>
          {categories?.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="py-2">
        <h4 className="text-sm font-medium text-body mb-2">Brands</h4>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
          {brands?.map((brand, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                id={brand}
                type="checkbox"
                checked={brandsFilter.includes(brand)}
                onChange={() => handleBrandsFilter(brand)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-indigo-600"
              />
              <label
                htmlFor={brand}
                className="select-none text-sm text-body cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        <button
          type="button"
          onClick={resetFilters}
          className="bg-card border border-error text-error w-full py-2 rounded-full text-sm font-medium hover:bg-error hover:text-white transition-colors"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={applyFilters}
          className="bg-primary w-full py-2 text-white rounded-full text-sm font-medium hover:bg-primary-hover active:scale-95 transition-all"
        >
          Apply
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 bg-card border border-slate-300 text-heading px-4 py-2 rounded-full shadow-sm mb-4 w-fit"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* Desktop sidebar */}
      <div className="self-start sticky top-20 hidden md:block shadow-md rounded-2xl py-5 px-4 bg-card">
        {filterContent}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-card shadow-xl overflow-y-auto px-4 py-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-heading">Filters</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-body" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;

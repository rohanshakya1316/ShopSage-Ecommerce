"use client";
import { deleteProduct, getProducts } from "@/api/products";
import Spinner from "@/components/Spinner";
import { PRODUCT_MANAGEMENT_ROUTE } from "@/constants/routes";
import { ROLE_ADMIN } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { format } from "date-fns";
import {
  Pen,
  Trash,
  Image as ImageIcon,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

const sortableColumns = [
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
  { key: "createdAt", label: "Created At" },
];

function SortIcon({ active, direction }) {
  if (!active) return <ChevronsUpDown size={14} className="opacity-40" />;
  return direction === "asc" ? (
    <ChevronUp size={14} />
  ) : (
    <ChevronDown size={14} />
  );
}

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const user = useAuthStore((state) => state.user);

  const fetchProducts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = user.roles.includes(ROLE_ADMIN)
        ? await getProducts({})
        : await getProducts({ createdBy: user._id });
      setProducts(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  function handleSort(field) {
    if (field === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPage(1);
  }

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory == "All Categories" ||
      product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "createdAt") {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const categorySet = new Set(products.map((product) => product.category));
  const categories = ["All Categories", ...categorySet];

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      {/* Controls */}
      <div className="bg-background p-4 rounded-xl shadow-sm border border-background/50 mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-1.5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="border border-muted/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Product</th>
              {sortableColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-4 font-semibold cursor-pointer select-none hover:text-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon
                      active={sortBy === col.key}
                      direction={sortOrder}
                    />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {paginatedProducts.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-center font-semibold py-4">
                  No products.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center">
                    {product.imageUrls.length > 0 ? (
                      <Image
                        key={index}
                        width={64}
                        height={64}
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="w-10 h-10 bg-gray-200 rounded-md mr-4 shrink-0"
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10 rounded-md mr-4 shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    Rs. {product.price}
                  </td>
                  <td
                    className={`px-6 py-4 ${product.stock >= 20 ? "text-green-500" : product.stock >= 10 ? "text-accent" : "text-red-600"} font-semibold`}
                  >
                    {product.stock}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium bg-green-200 text-primary/70 rounded-full">
                      {format(product.createdAt, "dd MMM, yyyy")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`${PRODUCT_MANAGEMENT_ROUTE}/${product._id}/edit`}
                    >
                      <button className="text-primary/90 hover:text-primary-hover mr-3">
                        <Pen />
                      </button>
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      type="button"
                      onClick={() => {
                        if (confirm("Are you sure?")) {
                          deleteProduct(product._id)
                            .then(() => {
                              toast.success("Product Deleted Successfully!");
                              fetchProducts();
                            })
                            .catch((error) => {
                              console.log(error);
                              toast.error(error.response.data);
                            });
                        }
                      }}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <span>
            Showing {totalProducts === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + PAGE_SIZE, totalProducts)} of {totalProducts}{" "}
            results
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .map((p, i, arr) => (
                <div key={p} className="flex items-center gap-2">
                  {i > 0 && arr[i - 1] !== p - 1 && (
                    <span className="px-1">…</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 border rounded ${
                      p === page
                        ? "border-indigo-300 bg-indigo-50 text-indigo-600"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                </div>
              ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsTable;

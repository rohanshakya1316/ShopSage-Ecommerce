const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-background animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Image Skeleton */}
        <div className="space-y-4">
          <div className="w-full aspect-square rounded-2xl bg-slate-200" />

          <div className="grid grid-cols-4 gap-3">
            <div className="aspect-square rounded-xl bg-slate-200"></div>
            <div className="aspect-square rounded-xl bg-slate-200"></div>
            <div className="aspect-square rounded-xl bg-slate-200"></div>
            <div className="aspect-square rounded-xl bg-slate-200"></div>
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col">
          {/* Category */}
          <div className="h-7 w-24 rounded-full bg-slate-200"></div>

          {/* Product Name */}
          <div className="mt-5 h-10 w-3/4 rounded bg-slate-200"></div>

          {/* Rating */}
          <div className="flex gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 rounded bg-slate-200"></div>
            ))}
            <div className="h-4 w-20 rounded bg-slate-200 ml-2"></div>
          </div>

          {/* Brand */}
          <div className="mt-5 h-5 w-44 rounded bg-slate-200"></div>

          {/* Price */}
          <div className="mt-6 h-10 w-40 rounded bg-slate-200"></div>

          {/* Stock */}
          <div className="mt-4 h-5 w-32 rounded bg-slate-200"></div>

          {/* Short Description */}
          <div className="mt-6 space-y-3">
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="h-4 w-5/6 rounded bg-slate-200"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <div className="flex-1 h-12 rounded-full bg-slate-200"></div>
            <div className="flex-1 h-12 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-14">
        <div className="h-8 w-48 rounded bg-slate-200 mb-6"></div>

        <div className="space-y-4">
          <div className="h-4 rounded bg-slate-200"></div>
          <div className="h-4 rounded bg-slate-200"></div>
          <div className="h-4 rounded bg-slate-200"></div>
          <div className="h-4 rounded bg-slate-200"></div>
          <div className="h-4 w-11/12 rounded bg-slate-200"></div>
          <div className="h-4 w-10/12 rounded bg-slate-200"></div>
          <div className="h-4 w-8/12 rounded bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;

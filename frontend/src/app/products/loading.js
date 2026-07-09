export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-background animate-pulse">
      <div className="h-64 sm:h-72 bg-slate-200 rounded-2xl mb-8" />

      <div className="h-6 w-48 bg-slate-200 rounded mb-2" />
      <div className="h-4 w-32 bg-slate-200 rounded mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-7">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-slate-200 rounded-xl overflow-hidden"
          >
            <div className="w-full aspect-[4/3] bg-slate-200" />
            <div className="p-2.5 flex flex-col gap-2">
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 rounded" />
              <div className="h-3 w-1/3 bg-slate-200 rounded" />
              <div className="h-5 w-1/2 bg-slate-200 rounded mt-1" />
              <div className="flex gap-2 pt-2">
                <div className="h-8 flex-1 bg-slate-200 rounded-full" />
                <div className="h-8 flex-1 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

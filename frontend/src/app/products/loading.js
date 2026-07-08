export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-background animate-pulse">
      <div className="h-40 bg-gray-200 rounded-2xl mb-8" />
      <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-72" />
        ))}
      </div>
    </div>
  );
}

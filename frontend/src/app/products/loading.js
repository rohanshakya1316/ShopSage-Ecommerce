// import placeholder from "@/assets/images/placeholder.png";
// import Image from "next/image";

// const LoadingCard = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {Array.from({ length: 8 }).map((_, index) => (
//           <div
//             key={index}
//             className="bg-card rounded-2xl shadow-md overflow-hidden border border-slate-100"
//           >
//             {/* Image */}
//             <div className="relative overflow-hidden">
//               <div className="h-64 w-full skeleton">
//                 <Image
//                   src={placeholder}
//                   alt="placeholder"
//                   height={300}
//                   width={400}
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-5">
//               {/* Category */}
//               <div className="skeleton h-3 w-20 rounded-full"></div>

//               {/* Product Name */}
//               <div className="mt-3 space-y-2">
//                 <div className="skeleton h-5 w-full rounded-md"></div>
//                 <div className="skeleton h-5 w-3/4 rounded-md"></div>
//               </div>

//               {/* Rating */}
//               <div className="mt-4 flex gap-2">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <div key={i} className="skeleton h-4 w-4 rounded-full"></div>
//                 ))}
//               </div>

//               {/* Brand */}
//               <div className="mt-4 skeleton h-4 w-1/2 rounded-md"></div>

//               {/* Price */}
//               <div className="mt-5 skeleton h-8 w-32 rounded-md"></div>

//               {/* Stock */}
//               <div className="mt-3 skeleton h-3 w-24 rounded-md"></div>

//               {/* Buttons */}
//               <div className="mt-6 flex gap-3">
//                 <div className="skeleton h-11 flex-1 rounded-lg"></div>
//                 <div className="skeleton h-11 flex-1 rounded-lg"></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default LoadingCard;
export default function LoadingCard() {
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
            <div className="w-full aspect-4/3 bg-slate-200" />
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
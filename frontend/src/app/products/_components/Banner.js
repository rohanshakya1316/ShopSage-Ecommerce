import Image from "next/image";

// export default function Banner() {
//   return (
//     <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 flex items-center justify-between px-10 py-10 mb-8">
//       <h1 className="text-white text-4xl font-bold">New Arrival</h1>

//       <Image
//         src="/caliber.jpg"
//         alt="Featured Shoes"
//         width={180}
//         height={120}
//         className="object-contain"
//       />

//       <div className="bg-white rounded-full h-20 w-20 flex flex-col items-center justify-center shadow-md">
//         <span className="text-red-600 font-bold text-lg leading-none">50%</span>
//         <span className="text-black text-xs">Off</span>
//       </div>
//     </div>
//   );
// }
export default function Banner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 flex items-center justify-between px-8 sm:px-14 py-10 sm:py-14 mb-8 h-52 sm:h-64 shadow-lg">
      {/* Decorative background circles for depth */}
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-xl" />
      {/* Left text block */}
      <div className="relative z-10 flex flex-col gap-3">
        <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide uppercase">
          Limited time offer
        </span>
        <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight">
          New Arrival
        </h1>
        <button className="mt-2 bg-white text-blue-700 font-semibold text-sm px-5 py-2 rounded-full w-fit hover:bg-blue-50 transition-colors shadow-sm">
          Shop Now
        </button>
      </div>
      {/* Center product image - no white box, blended with drop shadow */}
      {/* <div className="relative z-10 hidden sm:flex items-center justify-center flex-1 h-full">
        <img
          src="/hh.png"
          alt="Featured product"
          className="max-h-40 sm:max-h-48 object-contain drop-shadow-2xl"
        />
      </div> */}
      <div className="relative z-10 hidden sm:flex items-center justify-center flex-1 h-full">
        <div className="bg-white rounded-3xl h-52 w-52 sm:h-60 sm:w-60 flex items-center justify-center shadow-2xl ring-4 ring-white/30">
          <img
            src="/hh.png"
            alt="Featured product"
            className="max-h-48 sm:max-h-56 object-contain"
          />
        </div>
      </div>
      {/* Discount badge */}
      <div className="relative z-10 bg-white rounded-full h-24 w-24 sm:h-28 sm:w-28 flex flex-col items-center justify-center shadow-xl shrink-0 border-4 border-white/50">
        <span className="text-red-600 font-extrabold text-2xl sm:text-3xl leading-none">
          50%
        </span>
        <span className="text-black text-xs sm:text-sm font-medium">Off</span>
      </div>
    </div>
  );
}

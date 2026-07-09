export default function Banner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-dark-bg via-primary to-primary flex items-center justify-between px-8 sm:px-14 py-10 sm:py-14 mb-8 h-64 sm:h-72 shadow-lg">
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-xl" />

      <div className="relative z-10 flex flex-col gap-3">
        <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide uppercase">
          Limited time offer
        </span>
        <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight">
          New Arrival
        </h1>
        <button className="mt-2 bg-accent text-dark-bg font-semibold text-sm px-5 py-2 rounded-full w-fit hover:brightness-95 transition-all shadow-sm">
          Shop Now
        </button>
      </div>

      <div className="relative z-10 hidden sm:flex items-center justify-center flex-1 h-full">
        <div className="bg-card rounded-3xl h-52 w-52 sm:h-60 sm:w-60 flex items-center justify-center shadow-2xl ring-4 ring-white/30 p-2">
          <img
            src="/banner.png"
            alt="Featured product"
            className="max-h-48 sm:max-h-56 w-full object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 bg-card rounded-full h-24 w-24 sm:h-28 sm:w-28 flex flex-col items-center justify-center shadow-xl shrink-0 border-4 border-white/50">
        <span className="text-error font-extrabold text-2xl sm:text-3xl leading-none">
          50%
        </span>
        <span className="text-heading text-xs sm:text-sm font-medium">Off</span>
      </div>
    </div>
  );
}

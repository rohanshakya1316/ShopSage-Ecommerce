"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-8 sm:flex-row">

      <p className="text-body">
        Showing
        <span className="mx-2 font-semibold text-heading">
          1-4
        </span>
        of
        <span className="mx-2 font-semibold text-heading">
          4
        </span>
        orders
      </p>

      <div className="flex items-center gap-3">

        <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-card transition hover:border-primary hover:text-primary">
          <ChevronLeft size={20} />
        </button>

        <button className="h-11 w-11 rounded-lg bg-primary text-white font-semibold">
          1
        </button>

        <button className="h-11 w-11 rounded-lg border border-gray-300 bg-card transition hover:border-primary hover:text-primary">
          2
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-card transition hover:border-primary hover:text-primary">
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
};

export default Pagination;
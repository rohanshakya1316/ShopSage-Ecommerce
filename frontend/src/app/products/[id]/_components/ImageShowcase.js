"use client";

import { useState } from "react";

export default function ImageShowcase({ images, name, stock }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const lowStock = stock !== undefined && stock < 10;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-white rounded-2xl h-96 md:h-[30rem] flex items-center justify-center overflow-hidden border border-slate-200 p-6">
        <img
          src={activeImage}
          alt={name}
          className="h-full w-full object-contain transition-opacity duration-200"
        />
        {lowStock && (
          <span className="absolute top-4 left-4 bg-error text-white text-xs font-semibold px-3 py-1 rounded-full">
            Only {stock} left
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all p-1 ${
                activeImage === img
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

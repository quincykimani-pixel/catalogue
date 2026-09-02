"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const hasImages = images && images.length > 0;

  return (
    <div>
      <div className="relative aspect-[4/3] bg-surface-container border border-surface-dim mb-3">
        {hasImages ? (
          <Image
            src={images[active]}
            alt={name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted text-sm">
            No Image Available
          </div>
        )}
      </div>

      {hasImages && images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, index) => (
            <button
              key={src + index}
              onClick={() => setActive(index)}
              className={`relative aspect-square border ${
                active === index ? "border-navy" : "border-surface-dim"
              }`}
            >
              <Image src={src} alt={`${name} thumbnail ${index + 1}`} fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

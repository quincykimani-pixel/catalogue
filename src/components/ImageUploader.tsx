"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Upload failed.");
        }
        const data = await res.json();
        uploaded.push(data.url);
      }
      onChange([...images, ...uploaded]);
    } catch (err: any) {
      setError(err.message || "Something went wrong uploading the image.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function makeMain(index: number) {
    if (index === 0) return;
    const next = [...images];
    const [selected] = next.splice(index, 1);
    next.unshift(selected);
    onChange(next);
  }

  return (
    <div>
      <label className="label-field">Product Images</label>

      <div className="border border-dashed border-surface-dim p-4 text-center mb-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="text-sm"
        />
        <p className="text-xs text-ink-muted mt-2">
          Upload one or more images. The first image is used as the main product photo.
        </p>
        {uploading && <p className="text-xs text-navy mt-2">Uploading...</p>}
        {error && <p className="text-xs text-status-danger mt-2">{error}</p>}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div key={src + index} className="relative border border-surface-dim">
              <div className="relative aspect-square bg-surface-container">
                <Image src={src} alt={`Product image ${index + 1}`} fill unoptimized className="object-cover" />
              </div>
              {index === 0 && (
                <span className="absolute top-1 left-1 bg-navy text-white text-[10px] px-1.5 py-0.5">
                  Main
                </span>
              )}
              <div className="flex text-[11px]">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeMain(index)}
                    className="flex-1 py-1 border-t border-r border-surface-dim hover:bg-surface-container"
                  >
                    Set Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="flex-1 py-1 border-t border-surface-dim text-status-danger hover:bg-status-danger hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

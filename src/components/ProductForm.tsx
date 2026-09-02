"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import SpecificationEditor, { Spec } from "@/components/SpecificationEditor";
import ImageUploader from "@/components/ImageUploader";

export interface ProductFormValues {
  id?: string;
  name: string;
  category: string;
  price: number | string;
  sku?: string | null;
  shortDescription: string;
  description: string;
  images: string[];
  specifications: Spec[];
  availability: string;
  featured: boolean;
}

interface Props {
  initialValues?: ProductFormValues;
}

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  category: CATEGORIES[0].name,
  price: "",
  sku: "",
  shortDescription: "",
  description: "",
  images: [],
  specifications: [],
  availability: "In Stock",
  featured: false,
};

export default function ProductForm({ initialValues }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialValues?.id);
  const [values, setValues] = useState<ProductFormValues>(initialValues ?? EMPTY_VALUES);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!values.name.trim() || !values.category || values.price === "") {
      setError("Product name, category and price are required.");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/products/${initialValues!.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, price: Number(values.price) }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save product.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="text-sm text-status-danger border border-status-danger px-3 py-2">
          {error}
        </div>
      )}

      <div className="card p-6 space-y-4">
        <h2 className="font-semibold text-navy text-sm uppercase tracking-wide">Basic Details</h2>

        <div>
          <label className="label-field">Product Name</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label-field">Category</label>
            <select
              value={values.category}
              onChange={(e) => update("category", e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Price (KES)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={values.price}
              onChange={(e) => update("price", e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label-field">SKU (optional)</label>
            <input
              type="text"
              value={values.sku ?? ""}
              onChange={(e) => update("sku", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">Availability</label>
            <select
              value={values.availability}
              onChange={(e) => update("availability", e.target.value)}
              className="input-field"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Made to Order">Made to Order</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label-field">Short Description</label>
          <input
            type="text"
            value={values.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            className="input-field"
            placeholder="One-line summary shown on product cards"
          />
        </div>

        <div>
          <label className="label-field">Full Description</label>
          <textarea
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
            className="input-field"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          Mark as Featured Product
        </label>
      </div>

      <div className="card p-6">
        <ImageUploader images={values.images} onChange={(imgs) => update("images", imgs)} />
      </div>

      <div className="card p-6">
        <SpecificationEditor
          specifications={values.specifications}
          onChange={(specs) => update("specifications", specs)}
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

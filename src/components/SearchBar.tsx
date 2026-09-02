"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by product name, category or SKU..."
        className="input-field flex-1"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field sm:w-56"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn-primary sm:w-32">
        Search
      </button>
    </form>
  );
}

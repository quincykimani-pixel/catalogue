import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string; category?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q, category } = searchParams;

  const where: any = {};
  if (category) where.category = category;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { category: { contains: q, mode: "insensitive" } },
      { sku: { contains: q, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h1 className="section-heading mb-6">All Products</h1>

      <Suspense fallback={<div className="h-11" />}>
        <SearchBar />
      </Suspense>

      <div className="flex flex-wrap gap-2 mt-4 mb-8">
        <Link
          href="/products"
          className={`px-3 py-1.5 text-xs font-medium border ${
            !category ? "bg-navy text-white border-navy" : "border-surface-dim text-ink-muted hover:border-navy"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${encodeURIComponent(c.name)}`}
            className={`px-3 py-1.5 text-xs font-medium border ${
              category === c.name ? "bg-navy text-white border-navy" : "border-surface-dim text-ink-muted hover:border-navy"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <p className="text-sm text-ink-muted mb-6">
        {products.length} product{products.length !== 1 ? "s" : ""} found
        {q ? ` for "${q}"` : ""}
        {category ? ` in ${category}` : ""}.
      </p>

      {products.length === 0 ? (
        <div className="card p-10 text-center text-ink-muted">
          No products match your search. Try a different keyword or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{ ...p, images: (p.images as string[]) ?? [] }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { category: category.name },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <nav className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className={`px-3 py-1.5 text-xs font-medium border ${
              c.slug === category.slug
                ? "bg-navy text-white border-navy"
                : "border-surface-dim text-ink-muted hover:border-navy"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <h1 className="section-heading mb-2">{category.name}</h1>
      <p className="text-ink-muted mb-8 max-w-2xl">{category.description}</p>

      {products.length === 0 ? (
        <div className="card p-10 text-center text-ink-muted">
          No products in this category yet.
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

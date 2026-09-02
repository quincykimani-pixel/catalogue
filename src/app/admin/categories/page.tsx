import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const counts = await prisma.product.groupBy({
    by: ["category"],
    _count: { category: true },
  });

  const countMap = Object.fromEntries(counts.map((c) => [c.category, c._count.category]));

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy mb-2">Categories</h1>
      <p className="text-sm text-ink-muted mb-6">
        Categories are fixed to keep the catalogue simple. Assign a category to each product
        from the Add / Edit Product form.
      </p>

      <div className="card divide-y divide-surface-dim">
        {CATEGORIES.map((c) => (
          <div key={c.slug} className="flex items-center justify-between px-4 py-4">
            <div>
              <p className="font-medium text-ink">{c.name}</p>
              <p className="text-xs text-ink-muted">{c.description}</p>
            </div>
            <span className="text-sm font-semibold text-navy">
              {countMap[c.name] ?? 0} product{(countMap[c.name] ?? 0) !== 1 ? "s" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

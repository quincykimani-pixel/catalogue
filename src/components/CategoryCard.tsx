import Link from "next/link";
import type { Category } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="card p-6 flex flex-col justify-between hover:border-navy transition-colors"
    >
      <div>
        <h3 className="font-semibold text-navy text-lg mb-2">{category.name}</h3>
        <p className="text-sm text-ink-muted">{category.description}</p>
      </div>
      <span className="mt-4 text-sm font-medium text-brandgreen-dark">
        View Products &rarr;
      </span>
    </Link>
  );
}

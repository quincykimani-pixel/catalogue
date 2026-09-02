import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-heading mb-4">About Kyronex</h2>
          <p className="text-ink-muted leading-relaxed">
            Kyronex Electrical &amp; Interiors is a Nairobi-based supplier of
            solar, electrical, industrial, lighting and water &amp; power
            equipment. We work with contractors, technicians and homeowners
            to provide technically-specified products backed by knowledgeable
            in-store support at our Nyamakima Price Road location.
          </p>
        </div>
      </section>

      <section id="categories" className="bg-surface-container py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-heading">Product Categories</h2>
            <Link href="/products" className="text-sm font-medium text-brandgreen-dark hover:underline">
              View All Products &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-heading">Featured Products</h2>
            <Link href="/products" className="text-sm font-medium text-brandgreen-dark hover:underline">
              Browse All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  ...p,
                  images: (p.images as string[]) ?? [],
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Visit Our Store or Get in Touch</h2>
          <p className="text-white/70 mb-6">
            Nyamakima Price Road, Haaki Business Center, Nairobi, Kenya
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Kyronex
          </Link>
        </div>
      </section>
    </div>
  );
}

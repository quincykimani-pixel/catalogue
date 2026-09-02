import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGallery from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return `KES ${price.toLocaleString("en-KE")}`;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ slug: params.id }, { id: params.id }] },
  });

  if (!product) notFound();

  const specifications = (product.specifications as { name: string; value: string }[]) ?? [];
  const images = (product.images as string[]) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <nav className="text-sm text-ink-muted mb-6">
        <Link href="/products" className="hover:text-navy">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-navy">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={images} name={product.name} />

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-brandgreen-dark">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold text-navy mt-1 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-5">
            <span className="text-2xl font-semibold text-ink">{formatPrice(product.price)}</span>
            <span
              className={`text-xs font-medium px-2 py-1 border ${
                product.availability === "In Stock"
                  ? "border-status-success text-status-success"
                  : "border-status-warning text-status-warning"
              }`}
            >
              {product.availability}
            </span>
          </div>

          <p className="text-ink-muted leading-relaxed mb-6">{product.description}</p>

          {specifications.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wide">
                Specifications
              </h2>
              <table className="w-full text-sm border border-surface-dim">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-surface-container" : ""}>
                      <td className="px-3 py-2 font-medium text-ink w-1/3 border-b border-surface-dim">
                        {spec.name}
                      </td>
                      <td className="px-3 py-2 text-ink-muted border-b border-surface-dim">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {product.sku && (
            <p className="text-xs text-ink-muted mb-6">SKU: {product.sku}</p>
          )}

          <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-primary">
            Enquire About This Product
          </Link>
        </div>
      </div>
    </div>
  );
}

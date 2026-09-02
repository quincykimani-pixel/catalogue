import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/DeleteProductButton";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return `KES ${price.toLocaleString("en-KE")}`;
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-navy">Products ({products.length})</h1>
        <Link href="/admin/products/new" className="btn-secondary">
          + Add Product
        </Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-container text-left text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const images = (p.images as string[]) ?? [];
              return (
                <tr key={p.id} className="border-t border-surface-dim">
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-12 bg-surface-container">
                      {images[0] ? (
                        <Image src={images[0]} alt={p.name} fill unoptimized className="object-cover" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.category}</td>
                  <td className="px-4 py-3 text-ink-muted">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.availability}</td>
                  <td className="px-4 py-3">
                    {p.featured ? (
                      <span className="text-brandgreen-dark text-xs font-semibold">Yes</span>
                    ) : (
                      <span className="text-ink-muted text-xs">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="text-xs font-medium text-navy hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-center text-ink-muted text-sm">No products yet.</p>
        )}
      </div>
    </div>
  );
}

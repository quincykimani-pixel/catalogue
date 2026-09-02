import Link from "next/link";
import Image from "next/image";

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  shortDescription: string;
  images: string[];
  availability: string;
  featured: boolean;
}

function formatPrice(price: number) {
  return `KES ${price.toLocaleString("en-KE")}`;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  const mainImage = product.images?.[0];

  return (
    <div className="card group flex flex-col h-full">
      <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted text-sm">
            No Image
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-brandgreen text-white text-[11px] font-semibold uppercase tracking-wide px-2 py-1">
            Featured
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brandgreen-dark mb-1">
          {product.category}
        </span>
        <h3 className="font-semibold text-ink mb-1 leading-snug">{product.name}</h3>
        <p className="text-sm text-ink-muted mb-3 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-navy">{formatPrice(product.price)}</span>
          <span
            className={`text-xs font-medium ${
              product.availability === "In Stock" ? "text-status-success" : "text-status-warning"
            }`}
          >
            {product.availability}
          </span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="btn-outline w-full text-center"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

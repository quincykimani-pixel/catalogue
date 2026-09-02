import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-brandgreen-light text-xs font-semibold uppercase tracking-widest mb-4 border border-brandgreen-light px-3 py-1">
            Electrical &middot; Solar &middot; 3-Phase &middot; Lighting &middot; Water &amp; Power
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Reliable Electrical &amp; Solar Equipment for Kenya
          </h1>
          <p className="text-white/75 text-base md:text-lg mb-8 max-w-xl">
            Kyronex Electrical &amp; Interiors supplies technically-specified
            solar, electrical, industrial, lighting and water &amp; power
            equipment to contractors, businesses and homeowners across Nairobi.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-secondary">
              Browse Products
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-navy">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="border border-white/20 p-8">
            <p className="text-sm text-white/60 uppercase tracking-wide mb-2">Visit Our Store</p>
            <p className="text-lg font-semibold">Nyamakima Price Road</p>
            <p className="text-white/70">Haaki Business Center, Nairobi, Kenya</p>
          </div>
        </div>
      </div>
    </section>
  );
}

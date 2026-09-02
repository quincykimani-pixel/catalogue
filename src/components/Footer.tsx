import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 bg-brandgreen flex items-center justify-center font-bold text-white">
              K
            </span>
            <span className="font-semibold text-white">KYRONEX</span>
          </div>
          <p className="text-white/60">
            Electrical, solar and interior fittings supplier serving Nairobi
            and beyond with quality, technically-specified equipment.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-wide">
            Categories
          </h4>
          <ul className="space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="hover:text-brandgreen-light">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-wide">
            Company
          </h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-brandgreen-light">About Us</Link></li>
            <li><Link href="/products" className="hover:text-brandgreen-light">All Products</Link></li>
            <li><Link href="/contact" className="hover:text-brandgreen-light">Contact</Link></li>
            <li><Link href="/admin" className="hover:text-brandgreen-light">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-wide">
            Visit Us
          </h4>
          <address className="not-italic text-white/60 leading-relaxed">
            Nyamakima Price Road<br />
            Haaki Business Center<br />
            Nairobi, Kenya
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} Kyronex Electrical &amp; Interiors. All rights reserved.
      </div>
    </footer>
  );
}

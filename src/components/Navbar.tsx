import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-navy text-white border-b border-navy-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 bg-brandgreen flex items-center justify-center font-bold text-white">
              K
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-sm md:text-base tracking-wide">
                KYRONEX
              </span>
              <span className="block text-[10px] md:text-xs text-white/70 uppercase tracking-widest">
                Electrical &amp; Interiors
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/85 hover:text-brandgreen-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/products" className="hidden md:inline-flex btn-secondary">
            Browse Products
          </Link>
        </div>

        <nav className="md:hidden flex items-center gap-5 overflow-x-auto pb-3 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/85 whitespace-nowrap hover:text-brandgreen-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

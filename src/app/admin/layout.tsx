import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const ADMIN_LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add Product" },
  { href: "/admin/categories", label: "Categories" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = isAuthenticated();

  if (!authed) {
    return <div className="min-h-[70vh] flex items-center justify-center bg-surface-container">{children}</div>;
  }

  return (
    <div className="min-h-[80vh] max-w-7xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="card p-4 h-fit">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">
          Admin Panel
        </p>
        <nav className="space-y-1 text-sm">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 hover:bg-surface-container text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 pt-4 border-t border-surface-dim">
          <LogoutButton />
        </div>
      </aside>

      <section>{children}</section>
    </div>
  );
}

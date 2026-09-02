"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product.");
      router.refresh();
    } catch (err) {
      alert("Something went wrong deleting this product.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-xs font-medium text-status-danger hover:underline disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}

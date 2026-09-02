"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-status-danger hover:underline"
    >
      Log Out
    </button>
  );
}

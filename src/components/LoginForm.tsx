"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 w-full max-w-sm">
      <h1 className="text-xl font-semibold text-navy mb-1">Admin Login</h1>
      <p className="text-sm text-ink-muted mb-6">Kyronex Electrical &amp; Interiors</p>

      {error && (
        <div className="mb-4 text-sm text-status-danger border border-status-danger px-3 py-2">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="label-field">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div className="mb-6">
        <label className="label-field">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

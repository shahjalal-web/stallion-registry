/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("https://stallion-registry-back-end.vercel.app/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save admin token separately
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      // 🔥 Notify Navbar
      window.dispatchEvent(new Event("adminAuthChanged"));
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-950 border border-red-900/40 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
        <p className="text-zinc-400 text-sm mb-6">Authorized personnel only.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Admin Email
            </label>
            <input
              required
              type="email"
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-red-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="relative">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-red-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 mt-2 text-xs text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-2 bg-red-500/10 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition"
          >
            Admin Login
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Back to user login?{" "}
          <Link href="/login" className="text-[#D4AF37] hover:underline">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}

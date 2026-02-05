// src/app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error } = useAuth();
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/profile";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      router.push(redirectTo);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-zinc-400 text-sm mb-6">Login to manage your stallions and favorites.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email Address</label>
            <input 
              required type="email"
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div className="relative">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Password</label>
            <input 
              required type={showPassword ? "text" : "password"}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition"
              value={password} onChange={(e) => setPassword(e.target.value)}
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

          {error && <p className="text-red-500 text-xs mt-2 bg-red-500/10 p-2 rounded">{error}</p>}

          <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#FFD700] transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          New here? <Link href="/signup" className="text-[#D4AF37] hover:underline">Create an account</Link>
        </p>
        <p className="mt-6 text-center text-zinc-500 text-sm">
          Admin Login <Link href="/login/admin" className="text-[#846c1f] hover:underline">Admin Login</Link>
        </p>
      </div>
    </div>
  );
}
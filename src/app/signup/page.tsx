"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ name, email, subscription: "free", registeredStallions: [], favorites: [] }, password);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-zinc-400 text-sm mb-6">Join the leading sires registry today.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Full Name</label>
            <input 
              required
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition"
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
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

          <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#FFD700] transition shadow-lg shadow-[#D4AF37]/10">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Already have an account? <Link href="/login" className="text-[#D4AF37] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
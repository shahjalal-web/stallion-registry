/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuth } from "@/app/auth-context";
import type { Stallion } from "@/types/stallion";
import Link from "next/link";

export default function SubscriptionLockNotice({ stallion }: { stallion: Stallion }) {
  const { user } = useAuth();

  // ১. ইউজার যদি লগইন না থাকে
  if (!user) {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100">Login Required</p>
              <p className="text-xs text-zinc-400">Please login to view full stallion records and performance data.</p>
            </div>
          </div>
          <Link 
            href="/login" 
            className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  // ২. ইউজার লগইন আছে কিন্তু ফ্রি প্ল্যান (এবং স্ট্যালিয়নের প্রিমিয়াম ডেটা লক করা উচিত)
  if (user.subscription === "free") {
    return (
      <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100">Premium Content Locked</p>
              <p className="text-xs text-zinc-400">Upgrade to Premium to unlock full progeny stats, health reports, and judging notes.</p>
            </div>
          </div>
          <Link 
            href="/profile" 
            className="shrink-0 rounded-lg bg-[#D4AF37] px-4 py-2 text-xs font-bold text-black hover:bg-[#FFD700] transition shadow-lg shadow-[#D4AF37]/10"
          >
            Upgrade Account
          </Link>
        </div>
      </div>
    );
  }

  // ৩. ইউজার যদি পেইড হয়, তবে কোনো নোটিশ দেখানোর দরকার নেই
  return null;
}
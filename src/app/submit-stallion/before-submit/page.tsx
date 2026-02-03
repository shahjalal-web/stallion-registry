"use client";

import Link from "next/link";
import { useAuth } from "@/app/auth-context";

export default function StallionRequestPage() {
  const { user } = useAuth();

  // ১. ইউজার লগ-ইন না থাকলে এই ভিউটি দেখাবে
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Stallion Request Submission</h1>
        
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-10 text-left">
          <p className="text-zinc-300 mb-6">
            We’ve made the submission process simple and transparent:
          </p>
          
          {/* ক্লায়েন্টের দেওয়া বুলেট পয়েন্টগুলো এখানে হুবহু বসানো হয়েছে */}
          <ul className="space-y-4 text-zinc-400 text-sm mb-8">
            <li className="flex items-start gap-3">
              <span className="text-[#b08d57]">•</span>
              <span>Create an account so your details can be securely linked to the listing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b08d57]">•</span>
              <span>Fill out the stallion request form, including performance and progeny information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b08d57]">•</span>
              <span>Pay and submit your request for review</span>
            </li>
          </ul>

          <p className="text-zinc-500 text-xs italic">
            Creating an account allows us to pre-fill your information and makes future submissions faster.
          </p>
        </div>

        {/* ক্লায়েন্টের নির্দেশিত CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-none border border-white bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-transparent hover:text-white"
          >
            Create account to continue
          </Link>
          <Link
            href="/login"
            className="rounded-none border border-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  // ২. ইউজার লগ-ইন থাকলে এবং অ্যাকাউন্ট কমপ্লিট হলে এই বাটনটি দেখাবে
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-center">
      <h1 className="text-3xl font-bold text-white mb-8">Stallion Request</h1>
      <p className="text-zinc-400 mb-10">Welcome back! You can now start your stallion submission request.</p>
      
      <Link
        href="/submit-stallion" // এখানে আপনার অরিজিনাল ফর্মের লিঙ্ক দিন
        className="inline-block rounded-none border border-[#b08d57] bg-[#b08d57] px-12 py-5 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-transparent hover:text-[#b08d57]"
      >
        Start stallion request
      </Link>
    </div>
  );
}
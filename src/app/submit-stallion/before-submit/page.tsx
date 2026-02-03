"use client";

import Link from "next/link";
import { useAuth } from "@/app/auth-context";

export default function StallionRequestPage() {
  const { user } = useAuth();

  // ১. লগ-আউট ইউজার: শুধুমাত্র প্রসেস কপি এবং CTAs দেখবে
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-8 uppercase tracking-widest">
          Stallion Request Submission
        </h1>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-none p-10 text-left mb-10">
          <p className="text-zinc-300 mb-8 leading-relaxed">
            We’ve made the submission process simple and transparent:
          </p>

          <ul className="space-y-6 text-zinc-400 text-sm mb-10">
            <li className="flex items-start gap-4">
              <span className="text-[#b08d57] font-bold">•</span>
              <span>
                Create an account so your details can be securely linked to the
                listing
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#b08d57] font-bold">•</span>
              <span>
                Fill out the stallion request form, including performance and
                progeny information
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#b08d57] font-bold">•</span>
              <span>Pay and submit your request for review</span>
            </li>
          </ul>

          <p className="text-zinc-500 text-[11px] italic border-t border-zinc-800 pt-6">
            Creating an account allows us to pre-fill your information and makes
            future submissions faster.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/signup?redirect=/submit-stallion/before-submit"
            className="flex-1 sm:flex-none text-center rounded-none border border-white bg-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white"
          >
            Create account to continue
          </Link>
          <Link
            href="/login?redirect=/submit-stallion/before-submit"
            className="flex-1 sm:flex-none text-center rounded-none border border-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  // ২. লগ-ইন ইউজার: সরাসরি "Start stallion request" বাটন দেখবে
  return (
    <div className="max-w-3xl mx-auto py-24 px-6 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#b08d57]/10 text-[#b08d57]">
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">
        Account Verified
      </h1>

      <div className="max-w-md mx-auto space-y-4 mb-12">
        <p className="text-zinc-400 text-sm leading-relaxed">
          Welcome back! Your account creation is complete. You can now proceed
          to the stallion request form.
        </p>
        <p className="text-zinc-500 text-[11px] uppercase tracking-widest">
          Step 2 of 3: Detailed Information & Secure Payment
        </p>
      </div>

      <Link
        href="/submit-stallion" // আসল ফর্মের পাথ
        className="inline-block rounded-none border border-[#b08d57] bg-[#b08d57] px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-black transition hover:bg-transparent hover:text-[#b08d57]"
      >
        Start stallion request
      </Link>

      <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
        Requester details will be pre-filled from your profile
      </p>
    </div>
  );
}

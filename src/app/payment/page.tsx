"use client";

import { useState } from "react";

export default function PaymentAndConfirmation() {
  const [paymentStep, setPaymentStep] = useState("checkout"); // checkout | success
  const [selectedMethod, setSelectedMethod] = useState<"card" | "paypal" | null>(null);

  if (paymentStep === "success") {
    return (
      <div className="max-w-2xl mx-auto py-24 px-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-6">Submission received — thank you</h1>
        <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
          <p>Thank you for submitting your stallion profile to the Leading Sires Registry.</p>
          <p>We’re currently reviewing your submission and will contact you within 48 hours to confirm the final details before publishing the profile.</p>
          <div className="pt-8 border-t border-zinc-900 mt-10">
            <p className="text-sm">
              If you have any questions, contact us at <br />
              <a href="mailto:info@leadingsiresregistry.com" className="text-[#b08d57] font-bold hover:underline">
                info@leadingsiresregistry.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <div className="text-center mb-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#b08d57] mb-2">Secure Checkout</h2>
        <h1 className="text-2xl font-bold text-white">Stallion Listing Fee</h1>
      </div>

      <div className="rounded-none border border-zinc-800 bg-zinc-900/30 p-8 space-y-8">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="text-zinc-400 text-sm">Listing Type</span>
          <span className="text-white font-medium text-xs">Standard Performance Listing</span>
        </div>
        
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-white">Total</span>
          <span className="text-[#b08d57]">$250.00</span>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4 pt-4">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Select Payment Method</p>
          <div className="grid grid-cols-2 gap-3">
             <button
               onClick={() => setSelectedMethod("card")}
               className={`border p-3 text-center text-[10px] font-bold uppercase transition ${
                 selectedMethod === "card" ? "border-[#b08d57] text-[#b08d57] bg-[#b08d57]/5" : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
               }`}
             >
               Credit Card
             </button>
             <button
               onClick={() => setSelectedMethod("paypal")}
               className={`border p-3 text-center text-[10px] font-bold uppercase transition ${
                 selectedMethod === "paypal" ? "border-[#b08d57] text-[#b08d57] bg-[#b08d57]/5" : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
               }`}
             >
               PayPal
             </button>
          </div>
        </div>

        {/* Credit Card Input Fields (Conditional Rendering) */}
        {selectedMethod === "card" && (
          <div className="space-y-4 pt-4 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Card Number</label>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000"
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm text-white focus:border-[#b08d57] outline-none transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-bold">Expiry (MM/YY)</label>
                <input 
                  type="text" 
                  placeholder="MM/YY"
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm text-white focus:border-[#b08d57] outline-none transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-bold">CVV</label>
                <input 
                  type="text" 
                  placeholder="123"
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm text-white focus:border-[#b08d57] outline-none transition"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "paypal" && (
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 text-center animate-in fade-in duration-300">
            <p className="text-xs text-zinc-400">You will be redirected to PayPal to complete your payment.</p>
          </div>
        )}

        <button
          onClick={() => selectedMethod && setPaymentStep("success")}
          disabled={!selectedMethod}
          className="w-full rounded-none border border-[#b08d57] bg-[#b08d57] py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-[#b08d57] disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Pay & Submit Request
        </button>
      </div>
    </div>
  );
}
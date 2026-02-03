// src/app/signup/page.tsx
import { Suspense } from "react";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[#D4AF37]">Loading...</p>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
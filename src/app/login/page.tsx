// src/app/login/page.tsx
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    // এই Suspense ই আপনার এররটি সমাধান করবে
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[#D4AF37]">Loading...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
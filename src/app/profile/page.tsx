/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";

export default function ProfilePage() {
  const { user, logout, toggleFavorite, toggleSubscription } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null); // ডিলিট করার জন্য আইডি হোল্ড করবে
  const router = useRouter();

  useEffect(() => {
    if (!user && !localStorage.getItem("currentUser")) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user)
    return (
      <div className="text-center py-20 text-zinc-500">Loading profile...</div>
    );

  // --- ডিলিট ফাংশন ---
  const confirmDelete = () => {
    if (!deleteId || !user) return;

    const currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserIndex = currentUsers.findIndex(
      (u: any) => u.email === user.email,
    );

    if (currentUserIndex !== -1) {
      const updatedList = user.registeredStallions.filter(
        (s: any) => s.id !== deleteId,
      );
      const updatedUser = { ...user, registeredStallions: updatedList };

      // LocalStorage আপডেট
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      currentUsers[currentUserIndex].registeredStallions = updatedList;
      localStorage.setItem("users", JSON.stringify(currentUsers));

      // উইন্ডো রিলোড বা স্টেট আপডেট (এখানে সিম্পল রিলোড দিচ্ছি ডেটা সিঙ্ক রাখতে)
      window.location.reload();
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {user.name}
          </h1>
          <p className="text-zinc-500">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
              user.subscription === "paid"
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-zinc-800 text-zinc-400 border-zinc-700"
            }`}
          >
            {user.subscription} Plan
          </span>

          <button
            onClick={toggleSubscription}
            className={`text-xs font-bold px-4 py-2 rounded-md transition duration-300 shadow-lg ${
              user.subscription === "free"
                ? "bg-[#D4AF37] text-black hover:bg-[#FFD700]"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-red-400"
            }`}
          >
            {user.subscription === "free"
              ? "Upgrade to Premium"
              : "Downgrade to Free"}
          </button>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* MY REGISTRATIONS */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">My Registrations</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 min-h-40">
            {user.registeredStallions && user.registeredStallions.length > 0 ? (
              <div className="space-y-4">
                {user.registeredStallions.map((stallion: any) => (
                  <div
                    key={stallion.id}
                    className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 group hover:border-[#D4AF37]/30 transition"
                  >
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded bg-zinc-800 overflow-hidden shrink-0 border border-zinc-700">
                        <img
                          src={
                            stallion.media?.primaryImageUrl ||
                            "https://placehold.co/400x500/18181b/71717a?text=No+Image"
                          }
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">
                          {stallion.registeredName}
                        </h3>
                        <p className="text-[10px] text-zinc-500 uppercase mt-1">
                          {stallion.status} · {stallion.yearOfBirth}
                        </p>

                        <div className="mt-3 flex gap-4">
                          <Link
                            href={`/stallions/update/${stallion.id}`} // আপডেট পেজের লিঙ্ক
                            className="text-[10px] font-bold text-[#D4AF37] hover:underline"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => setDeleteId(stallion.id)}
                            className="text-[10px] font-bold text-red-500/70 hover:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/submit-stallion"
                  className="block text-center py-2 text-[10px] font-bold text-zinc-500 border border-dashed border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-zinc-300 transition"
                >
                  + Register Another Stallion
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <p className="text-sm text-zinc-500 mb-4">
                  You haven't registered any stallions yet.
                </p>
                <Link
                  href="/submit-stallion"
                  className="text-xs font-bold text-[#D4AF37] border border-[#D4AF37] px-6 py-2 rounded hover:bg-[#D4AF37] hover:text-black transition"
                >
                  Register a Stallion
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* MY FAVORITES */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">My Favorites</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 min-h-40">
            {user.favorites && user.favorites.length > 0 ? (
              <div className="space-y-3">
                {user.favorites.map((fav: any) => (
                  <div
                    key={fav.id}
                    className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 group hover:border-zinc-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-zinc-800 overflow-hidden border border-zinc-700">
                        <img
                          src={
                            fav.image ||
                            "https://placehold.co/100x100/18181b/71717a?text=N/A"
                          }
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">
                          {fav.registeredName}
                        </p>
                        <p className="text-[10px] text-zinc-500">{fav.breed}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(fav)}
                      className="text-[10px] font-bold text-red-500/70 hover:text-red-500 hover:underline transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-zinc-500">No favorites saved yet.</p>
                <Link
                  href="/stallions"
                  className="mt-2 text-xs text-[#D4AF37] hover:underline"
                >
                  Browse Directory
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl text-center">
            <h3 className="text-xl font-bold text-white">Are you sure?</h3>
            <p className="mt-4 text-sm text-zinc-400">
              This action cannot be undone. This stallion listing will be
              permanently removed from your profile.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-sm font-bold text-zinc-300 hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-500 transition shadow-lg shadow-red-600/20"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD ACTIONS */}
      <div className="pt-10 flex justify-center">
        <button
          onClick={logout}
          className="text-xs font-medium text-zinc-500 hover:text-white flex items-center gap-2 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout from Account
        </button>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";

export default function ProfilePage() {
  const { user, logout, toggleFavorite } = useAuth();
  const [stallions, setStallions] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  // 🔥 Fetch user's stallions
  useEffect(() => {
    const fetchMyStallions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://stallion-registry-back-end.vercel.app/my-stallions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setStallions(data);
      } catch {
        alert("Failed to load stallions");
      }
    };

    if (user) fetchMyStallions();
  }, [user]);

  const confirmDelete = async () => {
    if (!deleteId) return;

    const token = localStorage.getItem("token");

    await fetch(`https://stallion-registry-back-end.vercel.app/stallions/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setStallions((prev) => prev.filter((s) => s._id !== deleteId));
    setDeleteId(null);
  };

  if (!user)
    return <div className="text-center py-20 text-zinc-500">Loading...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <header className="border-b border-zinc-800 pb-8">
        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
        <p className="text-zinc-500">{user.email}</p>
      </header>

      {/* 🐎 My Stallions */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">
          My Registrations
        </h2>

        {stallions.length > 0 ? (
          stallions.map((stallion) => (
            <div
              key={stallion._id}
              className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 mb-4"
            >
              <div className="flex gap-4">
                <img
                  src={
                    stallion.media?.primaryImageUrl ||
                    "https://placehold.co/400x500"
                  }
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-white font-bold">
                    {stallion.registeredName}
                  </h3>
                  <p className="text-zinc-500 text-xs">
                    {stallion.status} · {stallion.yearOfBirth}
                  </p>

                  <div className="mt-3 flex gap-4">
                    <Link
                      href={`/stallions/update/${stallion._id}`}
                      className="text-xs text-[#D4AF37]"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => setDeleteId(stallion._id)}
                      className="text-xs text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">No stallions registered yet.</p>
        )}
      </section>

      {/* ❤️ Favorites */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">My Favorites</h2>
        {user.favorites?.length > 0 ? (
          user.favorites.map((fav: any) => (
            <div
              key={fav.id}
              className="flex justify-between bg-zinc-900 p-3 rounded mb-2"
            >
              <p className="text-white">{fav.registeredName}</p>
              <button
                onClick={() => toggleFavorite(fav)}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">No favorites yet.</p>
        )}
      </section>

      {/* ❗ Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-zinc-950 p-6 rounded-lg">
            <p className="text-white mb-4">Confirm delete?</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button onClick={confirmDelete} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={logout} className="text-zinc-500 text-xs mt-10">
        Logout
      </button>
    </div>
  );
}

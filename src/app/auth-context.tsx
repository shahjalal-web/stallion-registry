/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  role: string;
  name: string;
  email: string;
  subscription: "free" | "paid";
  registeredStallions: any[];
  favorites: any[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => void;
  signup: (userData: User, pass: string) => void;
  logout: () => void;
  toggleFavorite: (stallion: any) => void;
  toggleSubscription: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const signup = async (userData: User, pass: string) => {
    try {
      const response = await fetch("https://stallion-registry-back-end.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          password: pass,
        }),
      });

      const data = await response.json();
      console.log("hello");
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // 🔥 user + token store
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setUser(data.user);
      setError(null);

      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      const response = await fetch("https://stallion-registry-back-end.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 🔥 Save JWT + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      setUser(data.user);
      setError(null);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const toggleFavorite = (stallion: any) => {
    if (!user) return;

    const currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserIndex = currentUsers.findIndex(
      (u: any) => u.email === user.email,
    );

    if (currentUserIndex === -1) return;

    const isExist = user.favorites.find((f: any) => f.id === stallion.id);
    let updatedFavorites;

    if (isExist) {
      updatedFavorites = user.favorites.filter(
        (f: any) => f.id !== stallion.id,
      );
    } else {
      updatedFavorites = [
        ...user.favorites,
        {
          id: stallion.id,
          registeredName: stallion.registeredName,
          breed: stallion.breed,
          image: stallion.media?.primaryImageUrl,
        },
      ];
    }

    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    currentUsers[currentUserIndex].favorites = updatedFavorites;
    localStorage.setItem("users", JSON.stringify(currentUsers));
  };

  const toggleSubscription = () => {
    if (!user) return;

    const currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserIndex = currentUsers.findIndex(
      (u: any) => u.email === user.email,
    );

    if (currentUserIndex === -1) return;

    // এখানে টাইপ সেফটি নিশ্চিত করার জন্য type assertion ব্যবহার করা হয়েছে
    const newPlan = user.subscription === "free" ? "paid" : "free";

    const updatedUser: User = {
      ...user,
      subscription: newPlan as "free" | "paid", // এখানে as "free" | "paid" লিখে দাও
    };

    setUser(updatedUser);

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    currentUsers[currentUserIndex].subscription = newPlan;
    localStorage.setItem("users", JSON.stringify(currentUsers));

    alert(`Subscription updated to ${newPlan.toUpperCase()}!`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        toggleFavorite,
        toggleSubscription,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

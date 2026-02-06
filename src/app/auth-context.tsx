/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { auth, db } from "../lib/firebase"; // Apnar firebase setup file
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
  resetPassword: (email: string) => void;
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
      // 1️⃣ Step 1: Age MongoDB-te store kora
      const response = await fetch("https://stallion-registry-back-end.vercel.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          password: pass, // Plain password pathachhen backend-e hash korar jonno
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "MongoDB Signup failed");
      }
      console.log(userData.email, pass);
      // 2️⃣ Step 2: MongoDB success hole Firebase Auth-e user create kora
      createUserWithEmailAndPassword(auth, userData.email, pass)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user, "user form firebase");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, "error");
          // ..
        });

      // 4️⃣ Step 4: Final Success Logic
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setError(null);

      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
      console.error("Signup Error:", err.message);

      // Optional: Jodi MongoDB success hoy kintu Firebase fail kore,
      // tobe apni chaile backend-e ekta 'delete' request pathiye data clean korte paren.
    }
  };
  const login = async (email: string, pass: string) => {
    try {
      // 1. Firebase Auth (main authority)
      const firebaseUser = await signInWithEmailAndPassword(auth, email, pass);

      // 2. MongoDB login (with password)
      let response = await fetch("https://stallion-registry-back-end.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      let data = await response.json();

      // 3. Firebase ok but MongoDB password mismatch
      if (!response.ok && firebaseUser) {
        if (data.code === "PASSWORD_MISMATCH") {
          // 4. Sync MongoDB password
          const syncResponse = await fetch(
            "https://stallion-registry-back-end.vercel.app/sync-password",
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, newPassword: pass }),
            },
          );

          if (!syncResponse.ok) {
            throw new Error("Password sync failed");
          }

          // 5. MongoDB login retry (ONCE)
          response = await fetch("https://stallion-registry-back-end.vercel.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: pass }),
          });

          data = await response.json();
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 6. Success
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

  // auth-context er bhitore add koren:
  const resetPassword = async (email: string) => {
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("reset mail are send");
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      alert("Password reset link sent to your email! if you can not find the email, please check your spam folder.");
    } catch (err: any) {
      setError(err.message);
    }
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
        resetPassword,
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

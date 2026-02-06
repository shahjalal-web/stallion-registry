/* eslint-disable @typescript-eslint/no-unused-vars */
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

export function formatHeight(height?: { value: number; unit: "HH" | "cm" }) {
  if (!height) return "—";
  if (height.unit === "cm") return `${height.value} cm`;
  return `${height.value} HH`;
}



export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
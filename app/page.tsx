import { register } from "@/instrumention";
import LoginForm from "./auth/login/page";
import Link from "next/link";

export default function Home() {
  if (typeof window === "undefined") {
    // Run MongoDB connection once
    register().catch(console.error);
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Link
        href="/auth/login"
        className="text-emerald-600 bg-white rounded-2xl border border-black w-75 h-50  dark:text-emerald-400 hover:underline"
      >
        Go to Login
      </Link>
    </main>
  );
}

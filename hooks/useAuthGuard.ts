// hooks/useAuthGuard.ts
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/user/verify");
        const data = await res.json();

        if (!data.authenticated) {
          router.replace("/"); // redirect to login kung di authenticated
        } else {
          setIsVerified(true); // authenticated
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/"); // fallback redirect
      }
    }

    checkAuth();
  }, [router]);

  return isVerified;
}

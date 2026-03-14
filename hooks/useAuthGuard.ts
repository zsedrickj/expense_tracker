"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/user/verify", {
          credentials: "include", // important kung cookie auth
        });

        // handle expired or invalid token
        if (res.status === 401) {
          setIsVerified(false);
          router.replace("/");
          return;
        }

        const data = await res.json();

        if (!data.authenticated) {
          setIsVerified(false);
          router.replace("/");
        } else {
          setIsVerified(true);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsVerified(false);
        router.replace("/");
      }
    }

    checkAuth();
  }, [router]);

  return isVerified;
}

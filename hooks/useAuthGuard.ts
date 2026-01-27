// hooks/useAuthGuard.ts
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.replace("/"); // redirect to login
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVerified(true); // user has token
    }
  }, [router]);

  return isVerified;
}

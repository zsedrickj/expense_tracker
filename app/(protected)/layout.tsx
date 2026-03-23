"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "@/components/ui/navbar";
import AddTransaction from "@/components/ui/addTransaction";
import AddCategory from "@/components/ui/addCategory";
import { ModalProvider } from "./ModalContext";
import { RefreshProvider } from "./RefreshContext";
import { useModal } from "@/hooks/useModal";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Swal from "sweetalert2";
import { CurrencyProvider } from "./CurrencyContext";
import { ThemeProvider } from "./ThemeContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RefreshProvider>
      <ModalProvider>
        <CurrencyProvider>
          <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
        </CurrencyProvider>
      </ModalProvider>
    </RefreshProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isClosed, setIsClosed] = React.useState(true);
  const { showAddTransaction, showAddCategory } = useModal();
  const pathname = usePathname();
  const router = useRouter();
  const isVerified = useAuthGuard();
  const intervalRef = useRef<number | null>(null);
  const hasLoggedOutRef = useRef(false); // ✅ prevent multiple SweetAlerts

  // ✅ Poll token every 5s but alert only on actual expiration
  useEffect(() => {
    intervalRef.current = window.setInterval(async () => {
      try {
        const res = await fetch("/api/user/verify", {
          credentials: "include",
        });

        if (res.status === 401) {
          if (!hasLoggedOutRef.current) {
            hasLoggedOutRef.current = true;
            clearInterval(intervalRef.current!);
            intervalRef.current = null;

            await Swal.fire({
              icon: "warning",
              title: "Session Expired",
              text: "Your login session has expired. Please log in again.",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });

            router.replace("/auth/login");
          }
        }
      } catch (err) {
        console.error("Error checking token:", err);
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [router]);

  // ✅ REMEMBER LAST PAGE
  useEffect(() => {
    if (isVerified) {
      const lastPage = localStorage.getItem("lastPage") || "/dashboard";
      if (pathname === "/" || pathname.startsWith("/auth/login")) {
        router.replace(lastPage);
      }
    }
  }, [isVerified, pathname, router]);

  useEffect(() => {
    if (isVerified && pathname && !pathname.startsWith("/auth")) {
      localStorage.setItem("lastPage", pathname);
    }
  }, [isVerified, pathname]);

  if (isVerified === null) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen bg-background overflow-x-auto md:flex md:overflow-hidden">
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      <div className="flex-1 relative transition-all duration-300 overflow-x-auto">
        {!isClosed && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[3px] z-10 pointer-events-none md:hidden" />
        )}

        <div className="p-5 pt-20 font-sans md:px-20">{children}</div>

        {showAddTransaction && <AddTransaction />}
        {showAddCategory && <AddCategory />}
      </div>
    </div>
  );
}

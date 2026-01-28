"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "@/components/ui/navbar";
import AddTransaction from "@/components/ui/addTransaction";
import { ModalProvider } from "./ModalContext";
import { useModal } from "@/hooks/useModal";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ModalProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isClosed, setIsClosed] = React.useState(true);
  const { showAddTransaction, closeAddTransaction } = useModal();
  const pathname = usePathname();
  const router = useRouter();

  const isVerified = useAuthGuard(); // ✅ checks token & authentication

  // ✅ Redirect to lastPage or /dashboard if user is logged in
  useEffect(() => {
    if (isVerified) {
      const lastPage = localStorage.getItem("lastPage") || "/dashboard";

      // redirect only if current pathname is "/" (root) or "/auth/login"
      if (pathname === "/" || pathname.startsWith("/auth/login")) {
        router.replace(lastPage);
      }
    }
  }, [isVerified, pathname, router]);

  // ✅ Save current page to localStorage on every path change after verified
  useEffect(() => {
    if (isVerified && pathname && !pathname.startsWith("/auth")) {
      localStorage.setItem("lastPage", pathname);
    }
  }, [isVerified, pathname]);

  // ❌ Show loader while auth check is in progress
  if (isVerified === null) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen bg-gray-100 overflow-x-auto md:flex md:overflow-hidden">
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      <div className="flex-1 relative transition-all duration-300 overflow-x-auto">
        {!isClosed && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[3px] z-10 pointer-events-none md:hidden" />
        )}

        <div className="p-5 pt-20 md:px-20">{children}</div>

        {showAddTransaction && (
          <AddTransaction
            showAddTransaction={showAddTransaction}
            setShowAddTransaction={closeAddTransaction}
          />
        )}
      </div>
    </div>
  );
}

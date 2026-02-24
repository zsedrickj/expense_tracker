"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "@/components/ui/navbar";
import AddTransaction from "@/components/ui/addTransaction";
import AddCategory from "@/components/ui/addCategory"; // ✅ IMPORT ADDED
import { ModalProvider } from "./ModalContext";
import { RefreshProvider } from "./RefreshContext";
import { useModal } from "@/hooks/useModal";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RefreshProvider>
      <ModalProvider>
        <LayoutContent>{children}</LayoutContent>
      </ModalProvider>
    </RefreshProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isClosed, setIsClosed] = React.useState(true);

  // ✅ UPDATED: added showAddCategory
  const { showAddTransaction, showAddCategory } = useModal();

  const pathname = usePathname();
  const router = useRouter();
  const isVerified = useAuthGuard();

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
    <div className="h-screen w-screen bg-gray-100 overflow-x-auto md:flex md:overflow-hidden">
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      <div className="flex-1 relative transition-all duration-300 overflow-x-auto">
        {!isClosed && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[3px] z-10 pointer-events-none md:hidden" />
        )}

        <div className="p-5 pt-20 font-sans md:px-20">{children}</div>

        {/* ✅ MODALS */}
        {showAddTransaction && <AddTransaction />}
        {showAddCategory && <AddCategory />}
      </div>
    </div>
  );
}

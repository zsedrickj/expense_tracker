"use client";

import React from "react";
import NavBar from "@/components/ui/navbar";
import AddTransaction from "@/components/ui/addTransaction";
import { ModalProvider } from "./ModalContext";
import { useModal } from "@/hooks/useModal";

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

  return (
    <div className="h-screen w-screen bg-gray-100 overflow-x-auto md:flex md:overflow-hidden">
      {/* Navbar */}
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      {/* Main content */}
      <div className="flex-1 relative transition-all duration-300 overflow-x-auto">
        {!isClosed && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[3px]  z-10 pointer-events-none md:hidden"></div>
        )}

        {/* Page content */}
        <div className="p-5 pt-20  md:px-20">{children}</div>

        {/* Modal */}
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

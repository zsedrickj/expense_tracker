"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextType {
  showAddTransaction: boolean;
  openAddTransaction: () => void;
  closeAddTransaction: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const openAddTransaction = () => setShowAddTransaction(true);
  const closeAddTransaction = () => setShowAddTransaction(false);

  return (
    <ModalContext.Provider
      value={{ showAddTransaction, openAddTransaction, closeAddTransaction }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook para madaling gamitin sa pages

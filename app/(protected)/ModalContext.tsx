"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";

interface ModalContextType {
  // 🔹 Add Transaction
  showAddTransaction: boolean;
  openAddTransaction: () => void;
  closeAddTransaction: () => void;

  // 🔹 Add Category
  showAddCategory: boolean;
  openAddCategory: () => void;
  closeAddCategory: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // ── Add Transaction State ──
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const openAddTransaction = useCallback(() => {
    setShowAddTransaction(true);
  }, []);

  const closeAddTransaction = useCallback(() => {
    setShowAddTransaction(false);
  }, []);

  // ── Add Category State ──
  const [showAddCategory, setShowAddCategory] = useState(false);

  const openAddCategory = useCallback(() => {
    setShowAddCategory(true);
  }, []);

  const closeAddCategory = useCallback(() => {
    setShowAddCategory(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        // Transaction
        showAddTransaction,
        openAddTransaction,
        closeAddTransaction,

        // Category
        showAddCategory,
        openAddCategory,
        closeAddCategory,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

"use client";

import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ModalContextType {
  showAddTransaction: boolean;
  openAddTransaction: () => void;
  closeAddTransaction: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const openAddTransaction = useCallback(() => {
    setShowAddTransaction(true);
  }, []);

  const closeAddTransaction = useCallback(() => {
    setShowAddTransaction(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        showAddTransaction,
        openAddTransaction,
        closeAddTransaction,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

interface RefreshContextType {
  dashboardKey: number;
  transactionKey: number;
  refreshDashboard: () => void;
  refreshTransactions: () => void;
  refreshAll: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardKey, setDashboardKey] = useState(0);
  const [transactionKey, setTransactionKey] = useState(0);

  const refreshDashboard = useCallback(() => {
    setDashboardKey((prev) => prev + 1);
  }, []);

  const refreshTransactions = useCallback(() => {
    setTransactionKey((prev) => prev + 1);
  }, []);

  const refreshAll = useCallback(() => {
    setDashboardKey((prev) => prev + 1);
    setTransactionKey((prev) => prev + 1);
  }, []);

  return (
    <RefreshContext.Provider
      value={{
        dashboardKey,
        transactionKey,
        refreshDashboard,
        refreshTransactions,
        refreshAll,
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) throw new Error("useRefresh must be used within RefreshProvider");
  return context;
};
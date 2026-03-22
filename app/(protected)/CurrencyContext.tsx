/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useUserPreferredCurrency } from "@/hooks/useUserPreferredCurrency";

// 🔹 Currency type
type Currency = {
  code: string;
  symbol: string;
};

// 🔹 Supported currencies
const currencies: Record<string, Currency> = {
  PHP: { code: "PHP", symbol: "₱" },
  USD: { code: "USD", symbol: "$" },
  EUR: { code: "EUR", symbol: "€" },
  JPY: { code: "JPY", symbol: "¥" },
  GBP: { code: "GBP", symbol: "£" },
};

// 🔹 Context type
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
  loading: boolean;
  error: string | null;
}

// 🔹 Default values
const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencies.PHP,
  setCurrency: () => {},
  loading: false,
  error: null,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // 🔹 Use your existing hook
  const { currency: userCurrency, setCurrency: setUserCurrency, loading, error } =
    useUserPreferredCurrency();

  const [currency, setCurrencyState] = useState<Currency>(currencies.PHP);

  // 🔹 Map string from backend to currency object
  useEffect(() => {
    if (userCurrency && currencies[userCurrency]) {
      setCurrencyState(currencies[userCurrency]);
    }
  }, [userCurrency]);

  // 🔹 Update function for context
  const setCurrency = (code: string) => {
    if (!currencies[code]) return;
    setCurrencyState(currencies[code]);
    setUserCurrency(code); // also updates backend via hook
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
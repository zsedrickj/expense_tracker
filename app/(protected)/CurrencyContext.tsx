/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { type CurrencyCode, isSupportedCurrency } from "@/lib/currency";
import { useUserPreferredCurrency } from "@/hooks/useUserPreferredCurrency";

type Currency = {
  code: CurrencyCode;
};

const currencies: Record<CurrencyCode, Currency> = {
  PHP: { code: "PHP" },
  USD: { code: "USD" },
  EUR: { code: "EUR" },
  JPY: { code: "JPY" },
  GBP: { code: "GBP" },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
  loading: boolean;
  error: string | null;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencies.PHP,
  setCurrency: () => {},
  loading: false,
  error: null,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const {
    currency: userCurrency,
    setCurrency: setUserCurrency,
    loading,
    error,
  } = useUserPreferredCurrency();
  const [currency, setCurrencyState] = useState<Currency>(currencies.PHP);

  useEffect(() => {
    if (isSupportedCurrency(userCurrency)) {
      setCurrencyState(currencies[userCurrency]);
    }
  }, [userCurrency]);

  const setCurrency = (code: string) => {
    if (!isSupportedCurrency(code)) return;

    setCurrencyState(currencies[code]);
    setUserCurrency(code);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);

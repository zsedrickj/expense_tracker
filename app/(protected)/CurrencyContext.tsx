import { createContext, useContext, useState } from "react";

type Currency = {
  code: string;
  symbol: string;
};

const currencies: Record<string, Currency> = {
  PHP: { code: "PHP", symbol: "₱" },
  USD: { code: "USD", symbol: "$" },
  EUR: { code: "EUR", symbol: "€" },
  JPY: { code: "JPY", symbol: "¥" },
};

const CurrencyContext = createContext({
  currency: currencies.PHP,
  setCurrency: (code: string) => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies.PHP);

  const setCurrency = (code: string) => {
    setCurrencyState(currencies[code]);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);

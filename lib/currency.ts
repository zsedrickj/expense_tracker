export const SUPPORTED_CURRENCIES = ["USD", "PHP", "EUR", "JPY", "GBP"] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

export function isSupportedCurrency(value: string): value is CurrencyCode {
  return SUPPORTED_CURRENCIES.includes(value.toUpperCase() as CurrencyCode);
}

export function formatCurrency(amount: number | string, currency: CurrencyCode) {
  const numericAmount = Number(amount);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number.isFinite(numericAmount) ? numericAmount : 0);
}

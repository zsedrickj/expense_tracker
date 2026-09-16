export type CurrencyConversionResult = {
  currency: string;
  rate: number;
  rateDate: string;
  convertedTransactions: number;
};

export async function updateUserPreferredCurrency(
  currency: string,
): Promise<CurrencyConversionResult> {
  const res = await fetch("/api/user/currency", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currency }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to update currency");
  }

  return data;
}

import "server-only";

import { type CurrencyCode } from "./currency";

type ExchangeRateResponse = {
  base: string;
  quote: string;
  rate: number;
  date: string;
};

export type ExchangeRate = {
  rate: number;
  rateDate: string;
};

export async function getLatestExchangeRate(
  from: CurrencyCode,
  to: CurrencyCode,
): Promise<ExchangeRate> {
  if (from === to) {
    return { rate: 1, rateDate: new Date().toISOString().slice(0, 10) };
  }

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${from.toLowerCase()}/${to.toLowerCase()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Unable to get the latest exchange rate. Please try again.");
  }

  const data = (await response.json()) as ExchangeRateResponse;

  if (!Number.isFinite(data.rate) || data.rate <= 0) {
    throw new Error("The exchange-rate provider returned an invalid rate.");
  }

  return { rate: data.rate, rateDate: data.date };
}

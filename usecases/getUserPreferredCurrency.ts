/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getUserPreferredCurrency(): Promise<string> {
  try {
    const res = await fetch("/api/user/currency", {
      method: "GET",
      cache: "no-store", // ensure fresh data
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch");

    return data.currency;
  } catch (error: any) {
    console.error("Error fetching preferred currency:", error.message);
    return "PHP"; // fallback
  }
}
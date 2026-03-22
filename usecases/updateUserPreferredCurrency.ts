/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateUserPreferredCurrency(currency: string): Promise<string> {
  try {
    const res = await fetch("/api/user/currency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to update");

    return data.currency; // updated preferredCurrency from backend
  } catch (error: any) {
    console.error("Error updating preferred currency:", error.message);
    return currency; // fallback
  }
}
export const deleteTransaction = async (id: string) => {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
      credentials: "include", // para gumana kung may auth/cookies
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete transaction");
    }

    return await res.json();
  } catch (error) {
    console.error("Delete Transaction Error:", error);
    throw error;
  }
};

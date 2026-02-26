export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete category");
    }

    return await res.json();
  } catch (error) {
    console.error("Delete Category Error:", error);
    throw error;
  }
};

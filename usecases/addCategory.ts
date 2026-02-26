import { CreateCategoryDTO } from "@/types/category.types";

export const addCategory = async (data: CreateCategoryDTO, token?: string) => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: "include", // send cookie if using HttpOnly JWT
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || "Failed to add category");
  }

  return res.json();
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateCategoryDTO } from "@/types/category.types";

export const updateCategory = async (id: string, data: UpdateCategoryDTO) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // para ma-include cookies like JWT
    });

    let responseData: any = {};
    try {
      responseData = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON from response", err);
    }

    console.log("updateCategory API response:", res.status, responseData);

    if (!res.ok) {
      throw new Error(responseData.error || "Failed to update category");
    }

    return responseData;
  } catch (err: any) {
    console.error("updateCategory error:", err);
    throw err;
  }
};
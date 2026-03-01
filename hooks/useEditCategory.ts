/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { updateCategory as updateCategoryAPI } from "@/usecases/updateCategory";

export interface EditCategoryForm {
  name: string;
  type: "income" | "expense";
}

export const useEditCategory = (
  categoryId: string | undefined,
  initialData: EditCategoryForm,
) => {
  const [form, setForm] = useState<EditCategoryForm>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** Handle input & select changes */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Submit edited category */
  const submitEditCategory = async () => {
    // 1️⃣ Ensure category ID exists
    if (!categoryId) {
      const msg = "Category ID is missing.";
      console.error("submitEditCategory:", msg);
      setError(msg);
      return null;
    }

    // 2️⃣ Validate required fields
    if (!form.name.trim()) {
      const msg = "Please fill in the category name.";
      setError(msg);
      return null;
    }

    if (!form.type) {
      const msg = "Please select a category type.";
      setError(msg);
      return null;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Updating category", categoryId, form);

      const updated = await updateCategoryAPI(categoryId, form);

      return updated;
    } catch (err: any) {
      console.error("submitEditCategory error:", err);
      setError(err?.message || "Failed to update category");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    submitEditCategory,
    loading,
    error,
    setError,
  };
};
"use client";

import { useState } from "react";
import { updateUserProfile, UpdateUserForm } from "@/usecases/updateUser"; 

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdateUser = async (data: UpdateUserForm) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updateUserProfile(data);

      setSuccess("Profile updated successfully");
      return res;
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateUser,
    loading,
    error,
    success,
  };
};

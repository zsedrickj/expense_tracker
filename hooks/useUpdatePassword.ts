import { useState } from "react";
import { updatePassword as updatePasswordAPI} from "@/usecases/updatePassword";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useUpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const message = await updatePasswordAPI(oldPassword, newPassword);
      setSuccess(message);
      return message;
    } catch (err: any) {
      setError(err.message || "Network error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading, error, success };
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { User } from "@/types/user.types";
import { getUserInfo } from "@/usecases/getUser";

export const useUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getUserInfo(); // result is User
      setUser(result); // ✅ no error now
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { user, loading, error, refetch: fetchData };
};

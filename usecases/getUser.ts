import { User } from "../types/user.types";

export const getUserInfo = async (): Promise<User> => {
  const res = await fetch("/api/user", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch transactions: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();
  return json.data; 
};

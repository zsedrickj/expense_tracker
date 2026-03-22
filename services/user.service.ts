import {
  getUserBasicInfoById,
  getUserPasswordById,
  updateUserBasicInfo,
  updateUserPassword,
  updateUserPreferredCurrency,
  getUserById,
} from "@/repository/user.repository";

export async function getLoggedInUserBasicInfo(userId: string) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await getUserBasicInfoById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateLoggedInUserBasicInfo(
  userId: string,
  data: { fullname: string; email: string },
) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await updateUserBasicInfo(userId, data);

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
}

export async function changeLoggedInUserPassword(
  userId: string,
  hashedPassword: string,
) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await updateUserPassword(userId, hashedPassword);

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return { message: "Password updated successfully" };
}

export async function getLoggedInUserPassword(userId: string) {
  if (!userId) throw new Error("Unauthorized");

  const user = await getUserPasswordById(userId);

  if (!user) throw new Error("User not found");

  return user;
}

export async function changeUserPreferredCurrency(
  userId: string,
  currency: string,
) {
  if (!currency) throw new Error("Currency is required");

  // Optional: validate against allowed currencies
  const validCurrencies = ["USD", "PHP", "EUR", "JPY", "GBP"]; // example list
  if (!validCurrencies.includes(currency.toUpperCase())) {
    throw new Error("Invalid currency");
  }

  const updatedUser = await updateUserPreferredCurrency(userId, currency);

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
}

export async function getUserCurrency(userId: string) {
  const user = await getUserById(userId);
  return user?.preferredCurrency || "PHP"; // fallback
}

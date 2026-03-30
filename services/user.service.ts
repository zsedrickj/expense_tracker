import {
  getUserBasicInfoById,
  getUserPasswordById,
  updateUserBasicInfo,
  updateUserPassword,
  updateUserPreferredCurrency,
  getUserById,
  findUserByEmail,
  saveResetToken,
  findUserByResetToken,
  clearResetToken,
} from "@/repository/user.repository";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendResetEmail } from "@/lib/email";

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

export async function forgotPassword(email: string) {
  if (!email) throw new Error("Email is required.");

  const user = await findUserByEmail(email);

  // Always return success — hindi i-expose kung may account o wala
  if (!user) return { success: true };

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await saveResetToken(email, token, expires);

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  await sendResetEmail(email, resetUrl);

  return { success: true };
}

export async function resetPassword(token: string, newPassword: string) {
  if (!token) throw new Error("Token is required.");
  if (!newPassword) throw new Error("Password is required.");
  if (newPassword.length < 8)
    throw new Error("Password must be at least 8 characters.");

  const user = await findUserByResetToken(token);

  if (!user) throw new Error("Invalid or expired reset link.");

  const hashed = await bcrypt.hash(newPassword, 12);

  await updateUserPassword(String(user._id), hashed); // reuse existing repo function mo
  await clearResetToken(String(user._id));

  return { success: true };
}

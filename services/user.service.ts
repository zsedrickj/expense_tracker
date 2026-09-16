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
import { convertUserTransactionAmounts } from "@/repository/transaction.repository";
import { getLatestExchangeRate } from "@/lib/exchangeRates";
import { isSupportedCurrency, type CurrencyCode } from "@/lib/currency";
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

  const targetCurrency = currency.toUpperCase();
  if (!isSupportedCurrency(targetCurrency)) {
    throw new Error("Invalid currency");
  }

  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");

  const sourceCurrency = user.preferredCurrency.toUpperCase();
  if (!isSupportedCurrency(sourceCurrency)) {
    throw new Error("Your current currency is not supported for conversion");
  }

  if (sourceCurrency === targetCurrency) {
    return {
      user,
      rate: 1,
      rateDate: new Date().toISOString().slice(0, 10),
      convertedTransactions: 0,
    };
  }

  const { rate, rateDate } = await getLatestExchangeRate(
    sourceCurrency as CurrencyCode,
    targetCurrency,
  );
  const conversion = await convertUserTransactionAmounts(
    userId,
    rate,
    targetCurrency,
  );
  const updatedUser = await updateUserPreferredCurrency(userId, targetCurrency);

  if (!updatedUser) throw new Error("User not found");

  return {
    user: updatedUser,
    rate,
    rateDate,
    convertedTransactions: conversion.modifiedCount,
  };
}

export async function getUserCurrency(userId: string) {
  const user = await getUserById(userId);
  return user?.preferredCurrency || "PHP"; // fallback
}

export async function forgotPassword(email: string) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("A valid email is required.");

  const user = await findUserByEmail(email.trim().toLowerCase());

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

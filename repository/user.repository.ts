// src/repositories/user.repository.ts
import "server-only";

import DbConnnection from "@/lib/mongodb";
import User, { IUser } from "@/models/user";

export async function findUserByEmail(email: string) {
  await DbConnnection();
  return User.findOne({ email });
}

export async function createUser(data: {
  fullname: string;
  email: string;
  password: string;
  preferredCurrency?: string; // optional
}) {
  await DbConnnection();

  return User.create({
    ...data,
    preferredCurrency: data.preferredCurrency || "USD", // default to USD if not provided
  });
}

export async function getUserBasicInfoById(userId: string) {
  await DbConnnection();

  return User.findById(userId).select("fullname email").lean();
}

export async function updateUserBasicInfo(
  userId: string,
  data: { fullname: string; email: string },
) {
  await DbConnnection();

  return User.findByIdAndUpdate(
    userId,
    {
      fullname: data.fullname,
      email: data.email,
    },
    { new: true },
  ).select("fullname email");
}

export async function updateUserPassword(
  userId: string,
  hashedPassword: string,
) {
  await DbConnnection();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true },
  );

  return updatedUser;
}

export async function getUserPasswordById(userId: string) {
  await DbConnnection();
  return User.findById(userId).select("password").lean();
}

export async function updateUserPreferredCurrency(
  userId: string,
  currency: string,
): Promise<IUser | null> {
  return User.findByIdAndUpdate(
    userId,
    { preferredCurrency: currency.toUpperCase() },
    { new: true },
  );
}
export async function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId);
}

export async function findUserByResetToken(token: string) {
  await DbConnnection();

  // Step 1: hanapin kahit expired para malaman kung nandoon ang token
  const userWithToken = await User.findOne({
    resetPasswordToken: token,
  }).lean();

  console.log("[findUserByResetToken] token received:", token);
  console.log(
    "[findUserByResetToken] user found (no expiry check):",
    userWithToken,
  );
  console.log(
    "[findUserByResetToken] expires in DB:",
    userWithToken?.resetPasswordExpires,
  );
  console.log("[findUserByResetToken] now:", new Date());

  // Step 2: i-check kung expired
  const userValid = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  }).lean();

  console.log(
    "[findUserByResetToken] user valid (with expiry check):",
    userValid,
  );

  return userValid;
}

export async function saveResetToken(
  email: string,
  token: string,
  expires: Date,
) {
  await DbConnnection();
  return User.findOneAndUpdate(
    { email },
    { resetPasswordToken: token, resetPasswordExpires: expires },
    { new: true },
  );
}

export async function clearResetToken(userId: string) {
  await DbConnnection();
  return User.findByIdAndUpdate(userId, {
    $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
  });
}

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

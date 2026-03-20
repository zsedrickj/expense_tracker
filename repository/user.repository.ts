// src/repositories/user.repository.ts
import "server-only";

import DbConnnection from "@/lib/mongodb";
import User from "@/models/user";

export async function findUserByEmail(email: string) {
  await DbConnnection();
  return User.findOne({ email });
}

export async function createUser(data: {
  fullname: string;
  email: string;
  password: string;
}) {
  await DbConnnection();
  return User.create(data);
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
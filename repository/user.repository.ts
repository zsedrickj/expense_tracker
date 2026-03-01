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

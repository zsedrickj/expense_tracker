// src/services/auth.service.ts
import "server-only";

import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";
import { createUser, findUserByEmail } from "@/repository/user.repository";
import { LoginDTO, RegisterDTO } from "@/types/auth.types";

export async function login({ email, password }: LoginDTO) {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    throw { status: 400, message: "Email and password are required" };
  }

  const user = await findUserByEmail(email.trim().toLowerCase());

  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return {
    token,
    user: {
      userId: user._id,
      email: user.email,
    },
  };
}

export async function register({
  fullname,
  email,
  password,
  preferredCurrency,
}: RegisterDTO) {
  if (
    typeof fullname !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !fullname.trim() ||
    !email.trim() ||
    !password
  ) {
    throw { status: 400, message: "All fields are required" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    throw { status: 400, message: "A valid email is required" };
  }
  if (password.length < 8) {
    throw { status: 400, message: "Password must be at least 8 characters" };
  }
  if (fullname.trim().length > 100 || normalizedEmail.length > 254) {
    throw { status: 400, message: "Input is too long" };
  }

  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    throw { status: 409, message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    fullname: fullname.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    preferredCurrency: preferredCurrency || "USD", // default
  });

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return {
    token,
    user: {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      preferredCurrency: user.preferredCurrency, // now included
    },
  };
}

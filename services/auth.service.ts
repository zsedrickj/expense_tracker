// src/services/auth.service.ts
import "server-only";

import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";
import { createUser, findUserByEmail } from "@/repository/user.repository";
import { LoginDTO, RegisterDTO } from "@/types/auth.types";

export async function login({ email, password }: LoginDTO) {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const user = await findUserByEmail(email);

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

export async function register({ fullname, email, password }: RegisterDTO) {
  if (!fullname || !email || !password) {
    throw { status: 400, message: "All fields are required" };
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw { status: 409, message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
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
    },
  };
}

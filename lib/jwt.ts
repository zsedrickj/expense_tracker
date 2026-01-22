import jwt, { SignOptions } from "jsonwebtoken";

// Siguraduhin na JWT_SECRET ay defined
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Default options
const defaultOptions: SignOptions = {
  expiresIn: "7d",
};

export function generateToken(
  payload: object,
  options: SignOptions = defaultOptions,
) {
  return jwt.sign(payload, JWT_SECRET, options); // ✅ guaranteed na string
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

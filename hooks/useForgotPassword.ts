/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useForgotPassword.ts
"use client";

import { useState } from "react";
import { forgotPasswordRequest } from "@/usecases/forgotPassword";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submitForgotPassword = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await forgotPasswordRequest(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setEmail("");
    setSent(false);
    setError(null);
  };

  return {
    email,
    setEmail,
    loading,
    error,
    sent,
    submitForgotPassword,
    reset,
  };
}

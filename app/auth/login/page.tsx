"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // ✅ correct for App Router

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || data.message || "Something went wrong",
        });
        setLoading(false);
        return;
      }

      // Success alert + redirect
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${data.user.email}!`,
      }).then(() => {
        router.replace("/dashboard");
      });

      // Reset form
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Card */}
      <div className="flex flex-col w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mx-4 sm:mx-0">
        {/* Header */}
        <div className="flex flex-col items-center justify-center p-5">
          <div className="flex items-center justify-center bg-emerald-100 dark:bg-emerald-200 p-3 w-20 h-20 rounded-2xl mb-3">
            <Image
              src="/dollar-sign.png"
              width={40}
              height={40}
              alt="Dollar Sign"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
            Sign in to manage your expenses
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4 p-5 w-full"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="email"
            className="text-sm sm:text-base text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor="password"
            className="text-sm sm:text-base text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm">
            <label className="flex items-center gap-2 mb-2 sm:mb-0 text-gray-700 dark:text-gray-200">
              <input type="checkbox" id="remember" className="h-4 w-4" />
              Remember Me
            </label>

            <a
              href="/forgot-password"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full bg-emerald-600 dark:bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-700 dark:hover:bg-emerald-600 text-sm sm:text-base ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-200 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

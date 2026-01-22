"use client"; // Make this a client component
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Save JWT to localStorage (or cookie)
      localStorage.setItem("token", data.token);

      // Redirect to dashboard or home page
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
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
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
            Sign up to start managing your expenses
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4 p-5 w-full"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Full Name */}
          <label
            htmlFor="fullname"
            className="text-sm sm:text-base text-gray-700 dark:text-gray-200"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />

          {/* Email */}
          <label
            htmlFor="email"
            className="text-sm sm:text-base text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="text-sm sm:text-base text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />

          {/* Confirm Password */}
          <label
            htmlFor="confirm-password"
            className="text-sm sm:text-base text-gray-700 dark:text-gray-200"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-700 dark:hover:bg-emerald-600 text-sm sm:text-base mt-2"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-200 mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

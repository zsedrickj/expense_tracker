"use client"; // Make this a client component
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SignUpForm = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!fullname || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Something went wrong",
        });
        setLoading(false);
        return;
      }

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome, ${data.user.fullname}!`,
      }).then(() => {
        router.push("/dashboard");
      });

      // Reset form
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    } catch (err) {
      console.error(err);
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

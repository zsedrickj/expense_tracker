/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { X, Mail } from "lucide-react";
import { useForgotPassword } from "@/hooks/useForgotPassword";

interface Props {
  show: boolean;
  onClose: () => void;
}

const ForgotPassword = ({ show, onClose }: Props) => {
  const { email, setEmail, loading, error, sent, submitForgotPassword, reset } =
    useForgotPassword();

  if (!show) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const inputClass =
    "w-full p-3 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Forgot Password</h2>
          <X
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={handleClose}
          />
        </div>
        <hr className="border-border" />

        {!sent ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Enter the email linked to your account and we'll send you a reset
              link.
            </p>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitForgotPassword()}
              />
            </div>

            <button
              type="button"
              onClick={submitForgotPassword}
              disabled={loading}
              className={`mt-2 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Mail className="text-emerald-500 w-7 h-7" />
            </div>
            <p className="text-center font-semibold text-foreground">
              Check your inbox!
            </p>
            <p className="text-center text-sm text-muted-foreground">
              We sent a reset link to{" "}
              <span className="font-medium text-foreground">{email}</span>.
              Check your spam if you don't see it.
            </p>
            <div className="w-full p-3 bg-emerald-500/10 rounded-xl text-sm text-emerald-600 text-center">
              Link expires in 1 hour.
            </div>
            <button
              type="button"
              onClick={reset}
              className="text-sm text-emerald-500 hover:underline"
            >
              Resend email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

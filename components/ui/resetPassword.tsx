"use client";

import React from "react";
import { X } from "lucide-react";
import { useResetPassword } from "@/hooks/useResetPassword";

interface Props {
  show: boolean;
  onClose: () => void;
}

const strengthConfig = [
  { label: "Too short", color: "bg-red-500", width: "w-1/4" },
  { label: "Weak", color: "bg-red-500", width: "w-1/4" },
  { label: "Fair", color: "bg-amber-400", width: "w-2/4" },
  { label: "Good", color: "bg-purple-500", width: "w-3/4" },
  { label: "Strong", color: "bg-emerald-500", width: "w-full" },
];

const ResetPassword = ({ show, onClose }: Props) => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    getPasswordStrength,
    submitResetPassword,
  } = useResetPassword();

  if (!show) return null;

  const score = password ? getPasswordStrength(password) : -1;
  const strength = score >= 0 ? strengthConfig[score] : null;

  const inputClass =
    "w-full p-3 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Reset Password</h2>
          <X
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={onClose}
          />
        </div>
        <hr className="border-border" />

        {success ? (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center font-semibold text-foreground">
              Password reset successful!
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Redirecting you to login...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                New password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {strength && (
                <div className="flex flex-col gap-1">
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Confirm new password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitResetPassword()}
              />
            </div>

            <button
              type="button"
              onClick={submitResetPassword}
              disabled={loading}
              className={`mt-2 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

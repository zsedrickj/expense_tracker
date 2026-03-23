"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSettings from "@/components/ui/profileSettings";
import ChangePassword from "@/components/ui/changePassword";
import { useUserPreferredCurrency } from "@/hooks/useUserPreferredCurrency";
import { useUpdatePreferredCurrency } from "@/hooks/useUpdatePreferredCurrency";
import { useRefresh } from "../RefreshContext";
import { useCurrency } from "../CurrencyContext";
import { useTheme } from "../ThemeContext";

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (val: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0 ${
      enabled ? "bg-emerald-500" : "bg-muted"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
      <span className="text-muted-foreground">{icon}</span>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const currencyOptions = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "JPY", name: "Japanese Yen" },
];

const Settings = () => {
  const router = useRouter();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const { refreshDashboard } = useRefresh();
  const { setCurrency: setCurrencyContext } = useCurrency();

  const {
    currency,
    setCurrency,
    loading: currencyLoading,
  } = useUserPreferredCurrency();
  const { updateCurrency, loading: updatingCurrency } =
    useUpdatePreferredCurrency();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleCurrencyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCurrency = e.target.value.toUpperCase();
    setCurrency(selectedCurrency);
    try {
      setCurrencyContext(selectedCurrency);
      await updateCurrency(selectedCurrency);
      refreshDashboard();
    } catch (err) {
      console.error("Failed to update currency:", err);
    }
  };

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto m-auto max-w-200">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>

        <ProfileSettings />

        {/* Security */}
        <SectionCard
          title="Security"
          icon={
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowChangePassword(true)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-muted hover:bg-accent transition-colors text-sm font-medium text-foreground"
            >
              Change Password
              <span className="text-muted-foreground text-base">→</span>
            </button>
          </div>
        </SectionCard>

        {/* Preferences */}
        <SectionCard
          title="Preferences"
          icon={
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          }
        >
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={handleCurrencyChange}
                  disabled={currencyLoading || updatingCurrency}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm text-foreground outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                >
                  {currencyOptions.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                      className="bg-card text-foreground"
                    >
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dark Mode
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Enable dark mode theme
                  </p>
                </div>
                <Toggle enabled={darkMode} onChange={setDarkMode} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="w-full py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default Settings;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSettings from "@/components/ui/profileSettings";

// --- Toggle Component ---
const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (val: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
      enabled ? "bg-emerald-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

// --- Section Card ---
const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <span className="text-gray-500">{icon}</span>
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

// --- Settings Page ---
const Settings = () => {
  const router = useRouter();

  const [emailNotif, setEmailNotif] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD - US Dollar");
  const [language, setLanguage] = useState("English");

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

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto m-auto max-w-200">
      <div className="flex flex-col gap-6">
        {/* Page Header — same pattern as Dashboard */}
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
            <p className="text-gray-500">Manage your account and preferences</p>
          </div>
        </div>

        {/* Profile */}
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
            {["Change Password", "Two-Factor Authentication"].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
              >
                {item}
                <span className="text-gray-400 text-base">→</span>
              </button>
            ))}
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
            {/* Currency & Language — side by side on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                >
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                  <option>PHP - Philippine Peso</option>
                  <option>JPY - Japanese Yen</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                >
                  <option>English</option>
                  <option>Filipino</option>
                  <option>Spanish</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Dark Mode</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enable dark mode theme
                </p>
              </div>
              <Toggle enabled={darkMode} onChange={setDarkMode} />
            </div>
          </div>
        </SectionCard>

        {/* Log Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-500 font-medium text-sm
                     hover:bg-rose-100 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
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
    </div>
  );
};

export default Settings;

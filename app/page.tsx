"use client";

import Link from "next/link";
import { useTheme } from "@/app/(protected)/ThemeContext"; // i-adjust ang path kung iba ang location mo

export default function Home() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden relative transition-colors duration-300"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Background green radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse 80% 60% at 70% 60%, rgba(0,80,30,0.55) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 60% at 70% 60%, rgba(0,180,80,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 py-4 sm:py-5">
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 max-w-screen-xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <span className="text-black font-bold text-base sm:text-lg">
                $
              </span>
            </div>
            <span
              className="font-bold text-lg sm:text-xl tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              ExpenseTracker
            </span>
          </div>

          {/* Right side: toggle + get started */}
          <div className="flex items-center gap-3">
          

            <Link
              href="/auth/login"
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors duration-200 whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-10 max-w-screen-xl mx-auto gap-10 lg:gap-12">
        {/* Left: Text */}
        <div className="flex-1 w-full max-w-xl text-center lg:text-left">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Track Your Money.
            <br />
            <span className="text-green-400">Master Your Future.</span>
          </h1>
          <p
            className="text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0"
            style={{ color: "var(--muted-foreground)" }}
          >
            Monitor your income, control your expenses, and gain insights—all in
            one powerful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 sm:px-7 py-3 rounded-full transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              Start Tracking <span className="text-xl">→</span>
            </Link>
            <button
              className="flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full transition-colors duration-200 w-full sm:w-auto justify-center border"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              View Demo
            </button>
          </div>
        </div>

        {/* Right: Dashboard Preview */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {/* Sidebar strip */}
            <div
              className="absolute left-0 top-0 h-full w-10 sm:w-12 lg:w-14 rounded-l-2xl flex flex-col items-center py-4 sm:py-5 gap-4 sm:gap-6 z-10"
              style={{ background: "var(--sidebar)" }}
            >
              <button className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-green-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              {[
                <path
                  key="a"
                  d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                />,
                <path key="b" d="M3 3h18v18H3z" />,
                <path
                  key="c"
                  d="M7 7h.01M7 12h.01M12 7h.01M17 7h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01"
                />,
              ].map((icon, i) => (
                <button
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center transition-colors"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    {icon}
                  </svg>
                </button>
              ))}
              <div className="mt-auto">
                <button
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center transition-colors"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main dashboard card */}
            <div
              className="ml-10 sm:ml-12 lg:ml-14 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-2xl"
              style={{ background: "var(--card)" }}
            >
              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div
                  className="rounded-xl p-2 sm:p-3 lg:p-4"
                  style={{ background: "var(--muted)" }}
                >
                  <div className="flex items-center gap-1 text-green-400 text-xs mb-1 sm:mb-2">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="hidden sm:inline">Income</span>
                  </div>
                  <div
                    className="font-bold text-xs sm:text-base lg:text-xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    ₱45,230
                  </div>
                  <div className="text-green-400 text-xs mt-1">+12.5%</div>
                </div>
                <div className="rounded-xl p-2 sm:p-3 lg:p-4 bg-red-950">
                  <div className="flex items-center gap-1 text-red-400 text-xs mb-1 sm:mb-2">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 17H3m0 0V9m0 8l8-8 4 4 6-6" />
                    </svg>
                    <span className="hidden sm:inline">Expenses</span>
                  </div>
                  <div
                    className="font-bold text-xs sm:text-base lg:text-xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    ₱32,800
                  </div>
                  <div className="text-red-400 text-xs mt-1">-8.2%</div>
                </div>
                <div className="rounded-xl p-2 sm:p-3 lg:p-4 bg-blue-950">
                  <div className="flex items-center gap-1 text-blue-400 text-xs mb-1 sm:mb-2">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                    <span className="hidden sm:inline">Balance</span>
                  </div>
                  <div
                    className="font-bold text-xs sm:text-base lg:text-xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    ₱12,430
                  </div>
                  <div className="text-blue-400 text-xs mt-1">Available</div>
                </div>
              </div>

              {/* Spending Overview Chart */}
              <div
                className="rounded-xl p-2 sm:p-3 lg:p-4 mb-3 sm:mb-4"
                style={{ background: "var(--muted)" }}
              >
                <div
                  className="text-xs mb-2 sm:mb-3"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Spending Overview
                </div>
                <div className="flex items-end gap-1 sm:gap-2 h-10 sm:h-14 lg:h-16">
                  {[
                    { h: "80%", color: "bg-green-500" },
                    { h: "55%", color: "bg-red-500" },
                    { h: "90%", color: "bg-green-500" },
                    { h: "65%", color: "bg-red-500" },
                    { h: "75%", color: "bg-green-500" },
                    { h: "50%", color: "bg-red-500" },
                    { h: "100%", color: "bg-green-500" },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${bar.color}`}
                      style={{ height: bar.h }}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div
                className="rounded-xl p-2 sm:p-3 lg:p-4"
                style={{ background: "var(--muted)" }}
              >
                <div
                  className="text-xs mb-2 sm:mb-3"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Recent Transactions
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    {
                      label: "Salary",
                      date: "Mar 1, 2026",
                      amount: "+₱25,000",
                      color: "text-green-400",
                      dot: "bg-green-500",
                    },
                    {
                      label: "Groceries",
                      date: "Mar 3, 2026",
                      amount: "-₱2,450",
                      color: "text-red-400",
                      dot: "bg-red-500",
                    },
                    {
                      label: "Netflix",
                      date: "Mar 5, 2026",
                      amount: "-₱549",
                      color: "text-red-400",
                      dot: "bg-red-400",
                    },
                  ].map((tx, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div
                          className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full ${tx.dot} opacity-80 shrink-0`}
                        />
                        <div className="min-w-0">
                          <div
                            className="text-xs sm:text-sm font-medium truncate"
                            style={{ color: "var(--foreground)" }}
                          >
                            {tx.label}
                          </div>
                          <div
                            className="text-xs hidden sm:block"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {tx.date}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-semibold shrink-0 ${tx.color}`}
                      >
                        {tx.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

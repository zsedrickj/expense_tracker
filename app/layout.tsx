import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./(protected)/ThemeContext";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "ExpenseTracker",
  title: {
    default: "ExpenseTracker | Budget and Expense Tracking",
    template: "%s | ExpenseTracker",
  },
  description:
    "Track income, manage expenses, and understand your budget with ExpenseTracker.",
  keywords: [
    "expense tracker",
    "budget planner",
    "personal finance",
    "income tracker",
    "money management",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "ExpenseTracker",
    title: "ExpenseTracker | Budget and Expense Tracking",
    description:
      "Track income, manage expenses, and understand your budget with ExpenseTracker.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "ExpenseTracker | Budget and Expense Tracking",
    description:
      "Track income, manage expenses, and understand your budget with ExpenseTracker.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const themeInitializer = `
  try {
    const isDark = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle("theme-dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

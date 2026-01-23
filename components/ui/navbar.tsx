"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  Folder,
  Settings,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";

const NavBar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isClosed, setIsClosed] = useState(false); // false = sidebar open

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transaction", label: "Transaction", icon: ArrowLeftRight },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "categories", label: "Categories", icon: Folder },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Detect large screens and force sidebar open
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col h-full gap-5 transition-all duration-300 ease-in-out p-5 bg-white ${
        isClosed && !isLargeScreen
          ? "w-16 border-none"
          : isLargeScreen
            ? "w-[25%] border-r border-gray-400" // smaller width on large screens
            : "w-[75%] border-r border-gray-400" // mobile width
      }`}
    >
      {/* Top div with toggle icon (mobile only) */}
      {!isLargeScreen && (
        <div className="flex gap-4 items-center mb-2">
          <div
            className={`flex justify-center items-center p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
              isClosed
                ? "shadow-[0_0_15px_rgba(0,0,0,0.5)]" // black shadow when collapsed
                : "shadow-[9px_9px_15px_rgba(16,185,129,0.8)] dark:shadow-[10px_10px_25px_rgba(52,211,153,0.85)]"
            }`}
            onClick={() => setIsClosed(!isClosed)}
          >
            {isClosed ? (
              <Menu size={20} className="text-black" />
            ) : (
              <X size={20} className="text-black" />
            )}
          </div>

          {/* Show logo/title only if sidebar is open */}
          {!isClosed && (
            <div className="flex flex-col">
              <h1 className="text-xl">ExpenseTracker</h1>
              <p>Manage your money</p>
            </div>
          )}
        </div>
      )}

      {/* Logo/title for large screens */}
      {isLargeScreen && (
        <div className="flex items-center justify-start p-5 gap-3">
          <Image
            src="/dollar-sign.png"
            width={50}
            height={50}
            alt="Dollar Sign"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl">ExpenseTracker</h1>
            <p className="text-md">Manage your money</p>
          </div>
        </div>
      )}

      {/* Menu items */}
      {(!isClosed || isLargeScreen) &&
        menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-2 w-full  p-4 cursor-pointer transition-colors rounded-2xl ${
                active === item.id
                  ? "bg-emerald-100 border-emerald-500 text-emerald-600"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <Icon
                size={30}
                className={
                  active === item.id ? "text-emerald-600" : "text-black"
                }
              />
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
    </div>
  );
};

export default NavBar;

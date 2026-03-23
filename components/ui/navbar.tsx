"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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

interface NavBarProps {
  isClosed: boolean;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isClosed, setIsClosed }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large) setIsClosed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "transaction",
      label: "Transaction",
      icon: ArrowLeftRight,
      href: "/transaction",
    },
    { id: "reports", label: "Reports", icon: FileText, href: "/reports" },
    { id: "categories", label: "Categories", icon: Folder, href: "/category" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const sidebarClasses = isLargeScreen
    ? "md:w-auto lg:p-5 lg:border-r lg:border-border h-full"
    : isClosed
      ? "w-10 fixed top-5 left-5 z-50 rounded-2xl"
      : "w-[75%] fixed top-0 left-0 h-full border-r border-border bg-card p-5 z-50";

  return (
    <div
      className={`flex flex-col bg-card transition-all duration-300 ease-in-out ${sidebarClasses}`}
    >
      {!isLargeScreen && (
        <div
          className={`flex ${isClosed ? "justify-center" : "gap-4 items-center mb-4"}`}
        >
          <div
            onClick={() => setIsClosed(!isClosed)}
            className={`flex justify-center items-center p-3 rounded-2xl cursor-pointer transition-all duration-300 bg-card
              ${isClosed ? "shadow-[0_0_15px_rgba(0,0,0,0.3)]" : "shadow-[9px_9px_15px_rgba(16,185,129,0.5)]"}`}
          >
            {isClosed ? (
              <Menu size={20} className="text-foreground" />
            ) : (
              <X size={20} className="text-foreground" />
            )}
          </div>
          {!isClosed && (
            <div className="flex flex-col">
              <h1 className="text-xl text-foreground">ExpenseTracker</h1>
              <p className="text-muted-foreground text-sm">Manage your money</p>
            </div>
          )}
        </div>
      )}

      {isLargeScreen && (
        <div className="flex items-center justify-start p-5 gap-3">
          <Image
            src="/dollar-sign.png"
            width={50}
            height={50}
            alt="Dollar Sign"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg text-foreground">ExpenseTracker</h1>
            <p className="text-sm text-muted-foreground">Manage your money</p>
          </div>
        </div>
      )}

      {(!isClosed || isLargeScreen) &&
        menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 w-full p-4 rounded-2xl transition-colors
                ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-500" // ← works both light & dark
                    : "text-foreground hover:bg-muted"
                }`}
              onClick={() => setActive(item.id)}
            >
              <Icon
                size={30}
                className={isActive ? "text-emerald-500" : "text-foreground"}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default NavBar;

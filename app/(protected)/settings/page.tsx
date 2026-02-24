"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/"); // balik sa login
        router.refresh(); // para sure na cleared state
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md bg-white rounded-2xl shadow-lg ">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account preferences</p>
      </div>

      <button
        onClick={handleSignOut}
        className="w-full py-3 rounded-xl bg-rose-500 text-white font-medium
                   hover:bg-rose-600 transition-colors active:scale-[0.98]"
      >
        Sign out
      </button>
    </div>
  );
};

export default Settings;

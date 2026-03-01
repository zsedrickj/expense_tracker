"use client";

import { useState } from "react";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function ProfileSettings() {
  const { user, loading, error, refetch } = useUserInfo();

  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [overrideName, setOverrideName] = useState<string | null>(null);
  const [overrideEmail, setOverrideEmail] = useState<string | null>(null);

  const displayName = overrideName ?? user?.fullname ?? "";
  const displayEmail = overrideEmail ?? user?.email ?? "";

  const handleEdit = () => {
    setTempName(displayName);
    setTempEmail(displayEmail);
    setEditing(true);
  };

  const handleSave = () => {
    setOverrideName(tempName);
    setOverrideEmail(tempEmail);
    setEditing(false);
  };

  const handleCancel = () => setEditing(false);

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <svg
            className="animate-spin"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-2xl border border-red-200 shadow-sm p-6 text-center">
        <p className="text-sm text-red-500 mb-3">Failed to load profile</p>
        <button
          onClick={refetch}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <svg
          className="text-gray-500"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <h2 className="text-sm font-semibold text-gray-800">Profile</h2>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* User Info Row */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#059669"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* Name & Email */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
          </div>

          {/* Edit Button */}
          {!editing && (
            <button
              onClick={handleEdit}
              className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors shrink-0"
            >
              Edit
            </button>
          )}
        </div>

        {/* Full Name Field */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={editing ? tempName : displayName}
            onChange={(e) => setTempName(e.target.value)}
            readOnly={!editing}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-all ${
              editing
                ? "border-emerald-400 bg-white focus:ring-2 focus:ring-emerald-100"
                : "border-gray-200 bg-gray-50 cursor-default"
            }`}
          />
        </div>

        {/* Email Field */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={editing ? tempEmail : displayEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            readOnly={!editing}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-all ${
              editing
                ? "border-emerald-400 bg-white focus:ring-2 focus:ring-emerald-100"
                : "border-gray-200 bg-gray-50 cursor-default"
            }`}
          />
        </div>

        {/* Save / Cancel Buttons */}
        {editing && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

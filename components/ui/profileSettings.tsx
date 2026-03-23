"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEditUser } from "@/hooks/useEditUser";

export default function ProfileSettings() {
  const { user, loading, error, refetch } = useUserInfo();
  const {
    handleUpdateUser,
    loading: updating,
    error: updateError,
  } = useEditUser();

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

  const handleSave = async () => {
    if (!tempName || !tempEmail) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all fields",
      });
      return;
    }
    try {
      await handleUpdateUser({ fullname: tempName, email: tempEmail });
      setOverrideName(tempName);
      setOverrideEmail(tempEmail);
      setEditing(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err: unknown) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  const inputClass = (isEditing: boolean) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
      isEditing
        ? "border-emerald-500 bg-muted text-foreground focus:ring-2 focus:ring-emerald-100"
        : "border-border bg-muted text-foreground cursor-default"
    }`;

  if (loading) {
    return (
      <div className="w-full bg-card rounded-2xl border border-border shadow-sm p-8 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
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
      <div className="w-full bg-card rounded-2xl border border-destructive/30 shadow-sm p-6 text-center">
        <p className="text-sm text-destructive mb-3">Failed to load profile</p>
        <button
          onClick={refetch}
          className="px-4 py-2 text-sm font-medium text-white bg-destructive hover:bg-destructive/80 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
        <svg
          className="text-muted-foreground"
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
        <h2 className="text-sm font-semibold text-foreground">Profile</h2>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {displayEmail}
            </p>
          </div>
          {!editing && (
            <button
              onClick={handleEdit}
              className="px-4 py-1.5 text-sm font-medium text-foreground bg-muted hover:bg-accent rounded-lg transition-colors shrink-0"
            >
              Edit
            </button>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={editing ? tempName : displayName}
            onChange={(e) => setTempName(e.target.value)}
            readOnly={!editing}
            className={inputClass(editing)}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={editing ? tempEmail : displayEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            readOnly={!editing}
            className={inputClass(editing)}
          />
        </div>

        {updateError && (
          <p className="text-sm text-destructive mt-2">{updateError}</p>
        )}

        {editing && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditing(false)}
              disabled={updating}
              className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-accent rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updating}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

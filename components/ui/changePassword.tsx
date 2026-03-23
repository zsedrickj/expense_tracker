"use client";

import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";

type Props = { onClose: () => void };

const ChangePassword = ({ onClose }: Props) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { updatePassword, loading, error, success } = useUpdatePassword();

  useEffect(() => {
    if (error) Swal.fire({ icon: "error", title: "Error", text: error });
  }, [error]);
  useEffect(() => {
    if (success)
      Swal.fire({ icon: "success", title: "Success", text: success });
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const toggleShow = (field: "current" | "new" | "confirm") =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New password and confirm password do not match",
      });
      return;
    }
    try {
      await updatePassword(form.currentPassword, form.newPassword);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {}
  };

  const inputClass =
    "w-full p-3 pr-10 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Change Password</h2>
          <X
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={onClose}
          />
        </div>

        <hr className="border-border" />

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {[
            {
              label: "Current Password",
              name: "currentPassword",
              field: "current" as const,
            },
            {
              label: "New Password",
              name: "newPassword",
              field: "new" as const,
            },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              field: "confirm" as const,
            },
          ].map(({ label, name, field }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                {label}
              </label>
              <div className="relative">
                <input
                  type={show[field] ? "text" : "password"}
                  name={name}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={inputClass}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(field)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show[field] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

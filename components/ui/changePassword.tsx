"use client";

import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import
import { useUpdatePassword } from "@/hooks/useUpdatePassword";

type Props = {
  onClose: () => void;
};

const ChangePassword = ({ onClose }: Props) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 👁 toggle states
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { updatePassword, loading, error, success } = useUpdatePassword();

  // Show SweetAlert when error changes
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }, [error]);

  // Show SweetAlert when success changes
  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: success,
      });
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShow = (field: "current" | "new" | "confirm") => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
    } catch {
      // error handled by useEffect
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md gap-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
          <X
            className="cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={onClose}
          />
        </div>

        <hr className="border-gray-200" />

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Current Password
            </label>
            <div className="relative">
              <input
                type={show.current ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter current password"
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => toggleShow("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              New Password
            </label>
            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

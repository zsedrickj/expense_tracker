/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updatePassword(oldPassword: string, newPassword: string) {
  try {
    const res = await fetch("/api/user/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Throw error para ma-catch sa component
      throw new Error(data.error || "Failed to update password");
    }

    return data.message; // "Password updated successfully"
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
}

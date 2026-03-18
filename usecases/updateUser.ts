/* eslint-disable @typescript-eslint/no-explicit-any */

export type UpdateUserForm = {
  fullname: string;
  email: string;
};

export const updateUserProfile = async (data: UpdateUserForm) => {
  try {
    const res = await fetch(`/api/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    let responseData: any = {};
    try {
      responseData = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON from response", err);
    }

    console.log("updateUserProfile API response:", res.status, responseData);

    if (!res.ok) {
      throw new Error(responseData.error || "Failed to update user profile");
    }

    return responseData;
  } catch (err: any) {
    console.error("updateUserProfile error:", err);
    throw err;
  }
};

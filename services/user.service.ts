import {
  getUserBasicInfoById,
  updateUserBasicInfo,
  updateUserPassword,
} from "@/repository/user.repository";

export async function getLoggedInUserBasicInfo(userId: string) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await getUserBasicInfoById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateLoggedInUserBasicInfo(
  userId: string,
  data: { fullname: string; email: string },
) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await updateUserBasicInfo(userId, data);

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
}

export async function changeLoggedInUserPassword(
  userId: string,
  hashedPassword: string,
) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await updateUserPassword(userId, hashedPassword);

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return { message: "Password updated successfully" };
}

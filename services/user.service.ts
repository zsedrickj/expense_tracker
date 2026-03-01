import { getUserBasicInfoById } from "@/repository/user.repository";

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
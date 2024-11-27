"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUserName(username: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUserName = await db.user.findUnique({ where: { username } });

  if (existingUserName && existingUserName.id !== userId) {
    throw new Error("Username already taken");
  }

  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  await clerkClient.users.updateUser(userId, { username });
  return { success: true };
}

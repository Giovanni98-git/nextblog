"use server";

import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";

export const getCategories = async () => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }
    const res = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res;
  } catch (err) {
    console.log({ err });
  }
};

export const createCategory = async (name: string) => {
  const session = await authSession();

  if (!session) {
    throw new Error("Unauthorized: User Id not found");
  }
  try {
    const res = await prisma.category.create({
      data: {
        name,
        userId: session.user.id,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

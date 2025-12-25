import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { Post } from "@/lib/generated/prisma";

export const getUniquePost = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }
    const post = (await prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })) as Post;

    return post;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch post");
  }
};

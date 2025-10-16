// src/lib/posts.ts
import { prisma } from "./prisma";
import type { Post } from "@/types";

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
}

import { prisma } from "./prisma";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
}

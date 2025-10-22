"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function deletePost(postId: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post não encontrado");
  }

  if (post.userId !== session.user.id) {
    throw new Error("Você não tem permissão para deletar este post");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/posts");
}

export async function createPost(title: string, body: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  if (!title || !body) {
    throw new Error("Título e conteúdo são obrigatórios");
  }

  const newPost = await prisma.post.create({
    data: {
      userId: session.user.id,
      title,
      body,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  revalidatePath("/posts");
  return newPost;
}

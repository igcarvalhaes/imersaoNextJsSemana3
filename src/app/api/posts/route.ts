import { NextResponse } from "next/server"; // Importando NextResponse para manipular respostas

import { prisma } from "@/lib/prisma";

// Definindo o tipo de um Post para usar TypeScript
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json(
      { message: "Erro ao buscar posts" },
      { status: 500 }
    );
  }
}

//  POST - criar um novo Post

export async function POST(request: Request) {
  try {
    const { userId, title, body } = await request.json();

    // Validação básica dos dados recebidos
    if (!userId || !title || !body) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        userId: Number(userId),
        title,
        body,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { message: "Erro ao criar post" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar um post

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "ID do post é obrigatório",
        },
        {
          status: 400,
        }
      );
    }
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "Post deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return NextResponse.json(
      { message: "Erro ao deletar post" },
      { status: 500 }
    );
  }
}

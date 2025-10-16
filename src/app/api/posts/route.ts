// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json(
      { message: "Erro ao buscar posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // ✅ Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { title, body } = await request.json();

    if (!title || !body) {
      return NextResponse.json(
        { message: "Título e conteúdo são obrigatórios" },
        { status: 400 }
      );
    }

    // ✅ Usa o userId da sessão (mais seguro)
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

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { message: "Erro ao criar post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // ✅ Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID do post é obrigatório" },
        { status: 400 }
      );
    }

    // ✅ Busca o post para verificar se pertence ao usuário
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post não encontrado" },
        { status: 404 }
      );
    }

    // ✅ Verifica se o usuário é o dono do post
    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Você não tem permissão para deletar este post" },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: { id: Number(id) },
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

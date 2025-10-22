// src/components/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { createPost, deletePost } from "@/app/posts/actions";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

interface DeleteButtonProps {
  id: number;
  userId: string;
}

export default function DeleteButton({ id, userId }: DeleteButtonProps) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  // ✅ Só mostra o botão se for o dono do post
  if (!session?.user?.id || session.user.id !== userId) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este post?")) {
      return;
    }

    startTransition(async () => {
      try {
        await deletePost(id);
      } catch (error) {
        console.error("Erro ao deletar post:", error);
        alert(error instanceof Error ? error.message : "Erro ao deletar post.");
      }
    });
  };

  const isOwner = session?.user?.id === userId;

  if (!isOwner) {
    return null;
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Deletando..." : "Deletar Post"}
    </button>
  );
}

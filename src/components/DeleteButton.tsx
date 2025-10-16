// src/components/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DeleteButtonProps {
  id: number;
  userId: string;
}

export default function DeleteButton({ id, userId }: DeleteButtonProps) {
  const { data: session } = useSession();
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  // ✅ Só mostra o botão se for o dono do post
  if (!session?.user?.id || session.user.id !== userId) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este post?")) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao deletar post");
      }

      router.refresh();
      alert("Post deletado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      alert(error.message || "Erro ao deletar o post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-2 text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {deleting ? "Deletando..." : "Deletar Post"}
    </button>
  );
}

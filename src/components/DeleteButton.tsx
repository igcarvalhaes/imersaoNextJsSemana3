"use client";

import { useRouter } from "next/navigation"; // Importando useRouter para navegação e atualização de página

interface DeleteButtonProps {
  postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o post. ");
      }

      router.refresh(); // Atualiza a página para refletir a exclusão
    } catch (error) {
      console.error("Erro ao deletar post: ", error);
      alert("Erro ao deletar o post. Tente novamente.");
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="p-2 text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-md transition-colors"
    >
      Deletar Post
    </button>
  );
}

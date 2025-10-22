// src/components/PostForm.tsx
"use client";

import { createPost, deletePost } from "@/app/posts/actions";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

export default function PostForm() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();

  // Se não estiver carregado
  if (status === "loading") {
    return (
      <div className="w-full flex justify-center pt-20">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado (não deve acontecer por causa do middleware)
  if (status === "unauthenticated") {
    return (
      <div className="w-full flex justify-center pt-20">
        <p className="text-white">
          Você precisa estar logado para criar posts.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    startTransition(async () => {
      try {
        await createPost(title, body);
        setTitle("");
        setBody("");
      } catch (error) {
        console.error("Erro ao criar post:", error);
        alert(error instanceof Error ? error.message : "Erro ao criar o post");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-4 flex flex-col items-center pt-10 md:pt-20"
    >
      <div className="flex flex-col w-full max-w-md gap-4 p-4 bg-blue-zinc rounded-lg md:max-w-[627px] md:gap-5 md:p-6 md:h-[300px]">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          className="bg-dark-ocean-blue text-white rounded-md w-full h-12 outline-white pl-4 text-sm md:pl-6 md:text-base placeholder:text-gray-400"
          placeholder="Título do post"
          required
          disabled={isPending}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="body"
          className="bg-dark-ocean-blue text-white rounded-md w-full h-32 outline-white pl-4 pt-3 resize-none text-sm md:pl-6 md:h-40 md:text-base placeholder:text-gray-400  break-words overflow-y-auto"
          placeholder="Conteúdo do post"
          required
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="self-end h-10 w-full text-sm font-semibold bg-main-orange-color text-white rounded-md hover:bg-orange-600 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed md:h-12 md:w-28"
        >
          {isPending ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </form>
  );
}

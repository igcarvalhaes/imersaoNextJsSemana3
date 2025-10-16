// src/components/PostForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PostForm() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

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

    setSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id, // ✅ Usa o ID do usuário logado
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o post.");
      }

      setTitle("");
      setBody("");
      router.refresh();
      alert("Post criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar o post. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 pt-20">
      <div className="flex flex-col items-center gap-5 justify-center md:gap-28 md:justify-center md:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          className="bg-white rounded-md w-80 h-12 outline-main-orange-color pl-6"
          placeholder="Título do post"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="body"
          className="bg-white rounded-md w-80 h-12 outline-main-orange-color pl-6 resize-none pt-3"
          placeholder="Conteúdo do post"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="h-12 w-80 md:w-60 bg-main-orange-color text-white rounded-md hover:bg-orange-600 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Postando..." : "Postar"}
        </button>
      </div>
    </form>
  );
}

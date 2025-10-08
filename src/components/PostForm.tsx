"use client";

import { useState } from "react"; // Importando useState para gerenciar o estado dos campos do formulário
import { useRouter } from "next/navigation"; // Importando useRouter para navegação e atualização de página

// Componente de formulário para criar um novo post

export default function PostForm() {
  const [userId, setUserId] = useState("1"); // Temporariamente fixo como "1"
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // O userId sera sempre 1 temporariamente
          userId: Number(userId),
          title,
          body,
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar o post. ");
      }

      // Limpa os campos do formulário
      // setUserId(""); removido temporariamente
      setTitle("");
      setBody("");
      router.refresh(); // Atualiza a página para mostrar o novo post
    } catch (error) {
      console.error("Erro ao criar post: ", error);
      alert("Erro ao criar o post. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 pt-20">
      <div className="flex flex-col items-center gap-5 justify-center md:gap-18 md:flex-row">
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          id="userId"
          className="bg-gray-200 cursor-not-allowed rounded-md w-80 h-12 outline-main-orange-color pl-6"
          placeholder="ID do Usuário"
          disabled // Temporariamente desabilitado
        />
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
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="h-12 w-60 bg-main-orange-color text-white rounded-md mx-auto hover:bg-orange-600 transition-colors hover:cursor-pointer"
      >
        {submitting ? "Postando..." : "Postar"}
      </button>
    </form>
  );
}

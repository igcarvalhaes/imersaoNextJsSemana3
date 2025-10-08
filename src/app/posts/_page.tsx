"use client"; //Precisa disso para usar hooks do react

import { useState, useEffect } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Posts() {
  // Estado para armazenar a lista de posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Estado para controlar o feedback de carregamento
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para lidar com possíveis erros de busca
  const [error, setError] = useState<string | null>(null);

  //  estados para o formulário
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // useEffect para buscar os posts quando o componente for montado
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Inicia o estado de carregamento
        const response = await fetch("api/posts"); // Chamando a nossa API interna
        if (!response.ok) {
          throw new Error("Falha ao carregar os posts");
        }
        const data: Post[] = await response.json(); // Parse do JSON recebido
        setPosts(data); // Atualiza o estado com os posts recebidos
      } catch (err) {
        setError(
          "Não foi possível carregar os posts. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchPosts(); // Chama a função de busca
  }, []); // Array de dependências vazio para rodar apenas uma vez

  // Função para criar post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !title || !body) {
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
          userId: Number(userId),
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o post.");
      }

      const newPost = await response.json();
      setPosts([newPost, ...posts]); // Adiciona o novo post no início da lista

      // Limpa os campos do formulário
      setUserId("");
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar o post. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  // Função para deletar post
  const handleDelete = async (postId: number) => {
    if (!confirm("Tem certeza que deseja deletar este post?")) {
      return;
    }
    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o post.");
      }

      // remover post da lista
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      alert("Erro ao deletar o post. Tente novamente.");
    }
  };

  // Renderização condicional para os estados de loading e erro
  if (loading) {
    return (
      <p style={{ textAlign: "center", color: "white" }}>Carregando posts...</p>
    );
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div className="flex-1 h-screen bg-main-color-zinc flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-10 pt-20"
      >
        <div className="flex flex-col items-center gap-5 justify-center md:gap-18 md:flex-row">
          <input
            type="number"
            name={userId}
            onChange={(e) => setUserId(e.target.value)}
            id="userId"
            className="bg-white rounded-md w-80 h-12 outline-main-orange-color pl-6"
            placeholder="User ID"
            required
          />
          <input
            type="text"
            name={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="bg-white rounded-md w-80 h-12 outline-main-orange-color pl-6"
            placeholder="Title"
            required
          />
          <textarea
            name={body}
            onChange={(e) => setBody(e.target.value)}
            id="body"
            className="bg-white rounded-md w-80 h-12 outline-main-orange-color pl-6 resize-none pt-3"
            placeholder="Body"
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

      {/* LISTA DE POSTS RENDERIZADA DINAMICAMENTE */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="w-full max-w-10/12 md:max-w-[1104px] mt-10 bg-white rounded-lg shadow-md p-6 mb-6"
          >
            {/* Conteúdo do post em layout vertical */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  ID Usuario:
                </span>
                <h3 className="font-semibold text-gray-800">{post.userId}</h3>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{post.body}</p>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-md transition-colors"
                >
                  Deletar Post
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-center mt-10">Nenhum post encontrado.</p>
      )}
    </div>
  );
}

// ============================================
// FUNÇÕES DE DADOS - Posts
// ============================================
// Funções para buscar dados do banco (usadas em Server Components)

import { prisma } from "./prisma";
import type { Post } from "@/types";

// FUNÇÃO: BUSCAR TODOS OS POSTS
// Esta função roda NO SERVIDOR (não no navegador)
// Retorna uma Promise com array de posts
export async function getPosts(): Promise<Post[]> {
  try {
    // Busca todos os posts no banco usando Prisma
    const posts = await prisma.post.findMany({
      // Ordena pelos mais recentes primeiro
      orderBy: {
        createdAt: "desc", // 'desc' = descendente (mais novo → mais velho)
      },
    });

    return posts; // Retorna array de posts
  } catch (error) {
    // Se der erro, loga no console e retorna array vazio
    console.error("Erro ao buscar posts:", error);
    return []; // Retorna array vazio para não quebrar a aplicação
  }
}

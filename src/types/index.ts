// src/types/index.ts

// ============================================
// TIPOS COMPARTILHADOS
// ============================================
// Tipos usados em toda a aplicação para manter consistência

// TIPO POST
// Define a estrutura de um post conforme o banco de dados
export type Post = {
  id: number;
  userId: string; // ✅ String para compatibilidade com autenticação
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

// TIPO USER
// Define a estrutura de um usuário
export type User = {
  id: string; // ✅ String com CUID
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

// TIPO USER SEM SENHA (para retornar em APIs)
export type SafeUser = Omit<User, "password">;

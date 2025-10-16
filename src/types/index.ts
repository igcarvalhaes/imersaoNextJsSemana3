// src/types/index.ts
export type Post = {
  id: number;
  userId: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SafeUser = Omit<User, "password">;

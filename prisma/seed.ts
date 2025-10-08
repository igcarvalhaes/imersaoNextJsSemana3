import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar alguns posts iniciais
  const posts = [
    {
      userId: 1,
      title: "Primeiro post do blog",
      body: "Este é o conteúdo do primeiro post criado no nosso blog com SQLite e Prisma.",
    },
    {
      userId: 1,
      title: "Aprendendo Next.js",
      body: "Explorando as funcionalidades do Next.js 15 com App Router e Server Components.",
    },
    {
      userId: 2,
      title: "SQLite é incrível",
      body: "Descobrindo as vantagens de usar SQLite para desenvolvimento local.",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log("Seeds criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

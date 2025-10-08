# 📚 Imersão Next.js - Semana 1

**Serra Jr Engenharia**

Este projeto demonstra os conceitos fundamentais do Next.js 15 com App Router, criado durante a **Semana 1** da Imersão Next.js.

## 🎯 O que foi implementado

### 1. **App Router - O novo sistema de roteamento do Next.js**

#### 🔄 **Diferença do React tradicional:**

- **React**: Você precisa instalar e configurar React Router manualmente
- **Next.js**: Sistema de roteamento baseado em arquivos, automático e integrado

#### 📁 **Estrutura de pastas = Rotas automáticas:**

```
src/app/
├── layout.tsx          → Layout global (aplicado em todas as páginas)
├── page.tsx            → Página inicial (/)
├── globals.css         → Estilos globais
└── favicon.ico         → Ícone do site
```

**Como funciona:**

- `app/page.tsx` = rota `/` (página inicial)
- `app/about/page.tsx` = rota `/about` (automático!)
- `app/products/[id]/page.tsx` = rota `/products/123` (dinâmica!)

#### 🏗️ **Layout System:**

```tsx
// app/layout.tsx - Layout raiz aplicado em TODAS as páginas
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header /> {/* Aparece em todas as páginas */}
        <main>{children}</main> {/* Conteúdo da página atual */}
        <Footer /> {/* Aparece em todas as páginas */}
      </body>
    </html>
  );
}
```

### 2. **Componentes e Estrutura**

#### 🧩 **Arquitetura de componentes:**

```
src/
├── app/                    → Páginas e layouts (App Router)
│   ├── layout.tsx         → Layout global
│   ├── page.tsx           → Homepage
│   └── globals.css        → Estilos globais
├── components/            → Componentes reutilizáveis
│   ├── header/
│   │   └── index.tsx     → Componente Header
│   └── footer/
│       └── index.tsx     → Componente Footer
└── public/               → Arquivos estáticos (imagens, ícones)
    └── images/
        ├── logos/
        ├── icons/
        └── photos/
```

#### 🎨 **Componentização no Next.js:**

```tsx
// src/components/header/index.tsx
export function Header() {
  return (
    <header className="h-[85px] bg-dark-blue-color">
      {/* Conteúdo do header */}
    </header>
  );
}

// app/layout.tsx - Importação e uso
import { Header } from "@/components/header";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header /> {/* Componente reutilizável */}
        {children}
      </body>
    </html>
  );
}
```

### 3. **next/font/google - Sistema de fontes otimizado**

#### 🚀 **Vantagens sobre CSS tradicional:**

- **Performance**: Fontes baixadas em build time
- **Zero Layout Shift**: Evita mudanças de layout durante carregamento
- **Privacy**: Fontes servidas do seu domínio
- **Otimização automática**: Preload e cache automáticos

#### 📝 **Implementação:**

```tsx
// app/layout.tsx
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"], // Conjunto de caracteres
  weight: ["400", "700"], // Pesos da fonte
  variable: "--font-poppins", // Variável CSS (opcional)
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={poppins.className}>
        {" "}
        {/* Fonte aplicada globalmente */}
        {children}
      </body>
    </html>
  );
}
```

### 4. **Tailwind CSS v4 com cores customizadas**

#### 🎨 **Sistema de cores customizado:**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-main-orange-color: #ff6600; /* Laranja principal */
  --color-dark-blue-color: #001830; /* Azul escuro */
  --color-main-color-zinc: #d9d9d9; /* Zinco claro */
}
```

#### 🎯 **Como usar as cores:**

```tsx
// Backgrounds
<div className="bg-main-orange-color">
<div className="bg-dark-blue-color">
<div className="bg-main-color-zinc">

// Textos
<h1 className="text-main-orange-color">
<p className="text-dark-blue-color">

// Bordas
<div className="border-main-orange-color">
```

### 5. **next/image - Otimização automática de imagens**

#### 🖼️ **Vantagens sobre tag `<img>` tradicional:**

- **Lazy loading** automático
- **Redimensionamento** responsivo
- **Otimização de formato** (WebP automático)
- **Placeholder** durante carregamento
- **Core Web Vitals** otimizados

#### 📁 **Estrutura de imagens:**

```
public/
└── images/
    ├── logos/          → Logos da empresa/projeto
    ├── icons/          → Ícones pequenos
    └── photos/         → Fotos e banners
```

#### 🎯 **Implementação:**

```tsx
import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/images/logos/nextjs-logo.png" // Sempre começa com /
      alt="Logo Next.js"
      width={288} // Largura obrigatória
      height={174} // Altura obrigatória
      priority // Para imagens above-the-fold
    />
  );
}
```

### 6. **Layout Sticky Footer com Flexbox**

#### 🏗️ **Arquitetura do layout:**

```tsx
// app/layout.tsx
<body className="min-h-screen flex flex-col">
  <Header /> {/* Fixo no topo */}
  <main className="flex-1 flex flex-col">
    {" "}
    {/* Cresce para ocupar espaço */}
    {children} {/* Conteúdo da página */}
  </main>
  <Footer /> {/* Sempre visível na base */}
</body>
```

#### 🎯 **Resultado:**

- **Conteúdo pequeno**: Footer fica na parte inferior da tela
- **Conteúdo grande**: Footer fica após todo o conteúdo
- **Sempre visível**: Não precisa rolar para ver o footer

### 7. **Centralização responsiva**

#### 📐 **Técnica de centralização:**

```tsx
// app/page.tsx
<div className="flex flex-col items-center justify-center flex-1">
  <div className="h-[26rem] w-[44rem] bg-main-orange-color rounded-4xl">
    {/* Conteúdo centralizado */}
  </div>
</div>
```

#### 🎯 **Classes explicadas:**

- `flex flex-col`: Flexbox em coluna
- `items-center`: Centraliza horizontalmente
- `justify-center`: Centraliza verticalmente
- `flex-1`: Ocupa todo espaço disponível do pai

## 🚀 Como executar o projeto

### Instalação:

```bash
npm install
```

### Desenvolvimento:

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Build para produção:

```bash
npm run build
npm start
```

## 📊 Comparativo: Next.js vs React tradicional

| Aspecto         | React                 | Next.js                 |
| --------------- | --------------------- | ----------------------- |
| **Roteamento**  | React Router (manual) | App Router (automático) |
| **Estrutura**   | Livre                 | Baseada em pastas       |
| **Fontes**      | Google Fonts CSS      | next/font (otimizado)   |
| **Imagens**     | `<img>` básica        | next/image (otimizada)  |
| **Performance** | Manual                | Otimizada por padrão    |
| **SEO**         | SPA limitado          | SSR/SSG nativo          |

## ✅ **Implementações Finalizadas na Semana 2**

### 🗄️ **Banco de Dados SQLite + Prisma ORM**

**Configuração completa:**

```prisma
// prisma/schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  userId    Int
  title     String
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Cliente Prisma global:**

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
```

### 🔧 **Arquitetura Server + Client Components**

**Server Component (página principal):**

```typescript
// src/app/posts/page.tsx
export default async function Posts() {
  const posts = await getPosts(); // ✅ Busca no servidor

  return (
    <div>
      <PostForm /> {/* Client Component */}
      <PostList posts={posts} /> {/* Server Component */}
    </div>
  );
}
```

**Client Components específicos:**

```typescript
// src/components/PostForm.tsx - Formulário interativo
// src/components/DeleteButton.tsx - Botão com ação
```

### 📊 **CRUD Completo com API Routes**

**GET - Listar posts:**

```typescript
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}
```

**POST - Criar post:**

```typescript
export async function POST(request: Request) {
  const { userId, title, body } = await request.json();
  const newPost = await prisma.post.create({ data: { userId, title, body } });
  return NextResponse.json(newPost, { status: 201 });
}
```

**DELETE - Remover post:**

```typescript
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await prisma.post.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Post deletado" });
}
```

### 🔄 **Revalidação com useRouter**

```typescript
import { useRouter } from "next/navigation";

const router = useRouter();

// Após criar/deletar post
router.refresh(); // ✅ Revalida dados do servidor
```

## 📝 Conceitos Dominados

### ✅ **Fundamentos (Semana 1)**

- **App Router** - Sistema de roteamento baseado em arquivos
- **Layout System** - Layouts compartilhados entre páginas
- **next/font/google** - Otimização automática de fontes
- **next/image** - Componente otimizado para imagens
- **Tailwind CSS v4** - Cores customizadas com @theme
- **Componentização** - Estrutura organizada de componentes

### 🆕 **Avançado (Semana 2)**

- **SQLite + Prisma ORM** - Banco local com TypeScript type-safe
- **Server vs Client Components** - Arquitetura híbrida otimizada
- **API Routes robustas** - CRUD completo com validação
- **Data Fetching no servidor** - Performance sem loading states
- **useRouter + refresh()** - Revalidação automática de dados
- **Componentização estratégica** - Client apenas onde necessário
- **Seeds e Migrations** - Versionamento de banco estruturado
- **Error Handling completo** - UX consistente em toda aplicação

## 🛠️ Stack Tecnológica Final

- **Framework**: Next.js 15 (App Router + TypeScript)
- **Banco de Dados**: SQLite local para desenvolvimento
- **ORM**: Prisma Client com migrations e seeds automáticas
- **Arquitetura**: Server Components + Client Components híbrida
- **Styling**: Tailwind CSS v4 com sistema de cores customizado
- **Navegação**: useRouter com refresh() para revalidação de dados
- **Tipagem**: TypeScript strict mode end-to-end (banco → UI)
- **Fonte**: Poppins otimizada via next/font/google

## 📊 Diferencial da Semana 2

| Antes (Semana 1)        | Depois (Semana 2)                |
| ----------------------- | -------------------------------- |
| **Dados**: Estáticos    | **Dados**: Banco SQLite real     |
| **Componentes**: Client | **Componentes**: Server + Client |
| **Estado**: Local       | **Estado**: Servidor             |
| **Performance**: Média  | **Performance**: Otimizada       |
| **SEO**: Limitado       | **SEO**: Completo                |
| **Persistência**: Não   | **Persistência**: Sim            |

---

**Serra Jr Engenharia** - Imersão Next.js 2025 | Semana 2 Finalizada

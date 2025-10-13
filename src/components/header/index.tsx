import Link from "next/link"; // Componente de navegação do Next.js

// Componente Header - reutilizável em todas as páginas
export function Header() {
  return (
    // Header fixo com altura e cor customizada
    <header className="w-full h-24 bg-dark-blue-color text-white">
      {/* Navegação com flexbox para distribuir elementos */}
      <nav className="h-full flex items-center justify-evenly">
        {/* Logo/título da aplicação */}
        <div className="text-4xl font-bold">
          {/* Link do Next.js - otimizado para navegação SPA */}
          <Link href="/" className="hover:text-main-orange-color">
            NextJs
          </Link>
        </div>

        {/* Menu de navegação */}
        <ul className="flex space-x-10 md:gap-10">
          <li>
            {/* Link do Next.js - otimizado para navegação SPA */}
            <Link href="/" className="hover:text-main-orange-color text-2xl">
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/login"
              className="hover:text-main-orange-color text-2xl"
            >
              Entrar
            </Link>
          </li>

          <li>
            <Link
              href="/posts"
              className="hover:text-main-orange-color text-2xl"
            >
              Posts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

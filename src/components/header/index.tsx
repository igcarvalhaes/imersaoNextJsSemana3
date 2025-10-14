import Link from "next/link"; // Componente de navegação do Next.js
import { MobileMenuButton } from "./mobileMenuButton";

// Componente Header - reutilizável em todas as páginas
export function Header() {
  // Lista de links reutilizavel
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Entrar" },
    { href: "/posts", label: "Posts" },
  ];

  const NavList = ({ className }: { className: string }) => (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:text-main-orange-color text-2xl"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="w-full h-24 bg-dark-blue-color text-white relative">
      <nav className="h-full flex items-center justify-between mx-5 md:justify-evenly">
        <div className="text-4xl font-bold">
          <Link href="/" className="hover:text-main-orange-color">
            NextJs
          </Link>
        </div>

        {/* Componente client para mobile menu */}
        <MobileMenuButton>
          <NavList className="flex flex-col items-center space-y-6 py-8" />
        </MobileMenuButton>

        {/* Menu desktop (sempre server component) */}
        <NavList className="hidden md:flex space-x-10 md:gap-10" />
      </nav>
    </header>
  );
}

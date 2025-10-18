import Link from "next/link";
import { MobileMenuButton } from "./mobileMenuButton";
import { AuthNav } from "./authNav";

export function Header() {
  return (
    <header className="w-full h-24 bg-dark-gray-blue text-white relative">
      <nav className="h-full flex items-center justify-between mx-5 md:mx-8">
        {/* 1. Logo - Esquerda */}
        <div className="text-2xl font-bold flex-shrink-0">
          <Link href="/" className="hover:text-main-orange-color">
            Imersão Next.js
          </Link>
        </div>

        {/* 2. Home/Posts - Centro (apenas desktop) */}
        <ul className="hidden md:flex md:gap-10 absolute left-1/2 transform -translate-x-1/2">
          <li>
            <Link
              href="/"
              className="hover:text-main-orange-color font-semibold text-[15px]"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className="hover:text-main-orange-color font-semibold text-[15px]"
            >
              Posts
            </Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <MobileMenuButton>
          <AuthNav isMobile />
        </MobileMenuButton>

        {/* 3. Entrar/Cadastre-se - Direita (apenas desktop) */}
        <AuthNav />
      </nav>
    </header>
  );
}

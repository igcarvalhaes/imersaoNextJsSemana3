// src/components/header/index.tsx
import Link from "next/link";
import { MobileMenuButton } from "./mobileMenuButton";
import { AuthNav } from "./authNav";

export function Header() {
  return (
    <header className="w-full h-24 bg-dark-blue-color text-white relative">
      <nav className="h-full flex items-center justify-between mx-5 md:justify-evenly">
        <div className="text-4xl font-bold">
          <Link href="/" className="hover:text-main-orange-color">
            NextJs
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenuButton>
          <AuthNav isMobile />
        </MobileMenuButton>

        {/* Desktop Menu */}
        <AuthNav />
      </nav>
    </header>
  );
}

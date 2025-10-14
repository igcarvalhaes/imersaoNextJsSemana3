"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuButtonProps {
  children: React.ReactNode; //para receber a ul como children
}

export function MobileMenuButton({ children }: MobileMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Botão do menu mobile */}
      <button
        className="md:hidden z-50 relative"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu mobile que recebe a ul como children */}
      <div
        className={`
          absolute top-24 left-0 w-full bg-dark-blue-color z-40
          transition-transform duration-300 ease-in-out md:hidden
          ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }
        `}
      >
        <div onClick={closeMenu}>{children}</div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}

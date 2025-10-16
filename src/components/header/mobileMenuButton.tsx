// src/components/header/MobileMenuButton.tsx
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuButtonProps {
  children: React.ReactNode;
}

export function MobileMenuButton({ children }: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão hamburguer */}
      <button
        className="md:hidden text-white hover:text-main-orange-color"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-24 left-0 w-full bg-dark-blue-color z-50 md:hidden">
          {children}
        </div>
      )}
    </>
  );
}

// src/components/header/AuthNav.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface AuthNavProps {
  isMobile?: boolean;
}

export function AuthNav({ isMobile = false }: AuthNavProps) {
  const { data: session, status } = useSession();

  const baseClass = isMobile
    ? "flex flex-col items-center space-y-6 py-8"
    : "hidden md:flex space-x-10 md:gap-10";

  return (
    <ul className={baseClass}>
      <li>
        <Link href="/" className="hover:text-main-orange-color text-2xl">
          Home
        </Link>
      </li>
      <li>
        <Link href="/posts" className="hover:text-main-orange-color text-2xl">
          Posts
        </Link>
      </li>

      {status === "loading" ? (
        <li className="text-main-orange-color text-2xl">...</li>
      ) : status === "authenticated" ? (
        <>
          <li className="text-main-orange-color text-2xl">
            Olá, {session.user?.name}
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:text-main-orange-color text-2xl cursor-pointer"
            >
              Sair
            </button>
          </li>
        </>
      ) : (
        <>
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
              href="/cadastro"
              className="hover:text-main-orange-color text-2xl"
            >
              Cadastrar
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

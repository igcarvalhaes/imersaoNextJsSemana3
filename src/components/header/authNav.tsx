"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface AuthNavProps {
  isMobile?: boolean;
}

export function AuthNav({ isMobile = false }: AuthNavProps) {
  const { data: session, status } = useSession();

  if (isMobile) {
    // Menu mobile - mostra tudo em coluna
    return (
      <ul className="flex flex-col items-center space-y-6 py-8">
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

        {status === "loading" ? (
          <li className="text-main-orange-color text-[15px]">...</li>
        ) : status === "authenticated" ? (
          <>
            <li className="text-main-orange-color text-[15px] font-semibold">
              Olá, {session.user?.name}
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-main-orange-color text-[15px] font-semibold cursor-pointer"
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
                className="hover:text-main-orange-color text-[15px] font-semibold"
              >
                Entrar
              </Link>
            </li>
            <li>
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center w-36 h-[45px] bg-main-orange-color text-white text-[15px] font-semibold rounded-md hover:bg-bright-orange-color transition-colors"
              >
                Cadastre-se
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  }

  // Desktop - apenas Entrar/Cadastre-se (Home/Posts estão no Header)
  return (
    <ul className="hidden md:flex md:items-center md:gap-6 flex-shrink-0">
      {status === "loading" ? (
        <li className="text-main-orange-color text-[15px]">...</li>
      ) : status === "authenticated" ? (
        <>
          <li className="text-main-orange-color text-[15px] font-semibold">
            Olá, {session.user?.name}
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:text-main-orange-color text-[15px] font-semibold cursor-pointer"
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
              className="hover:text-main-orange-color text-[15px] font-semibold"
            >
              Entrar
            </Link>
          </li>
          <li>
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center w-36 h-[45px] bg-main-orange-color text-white text-[15px] font-semibold rounded-md hover:bg-bright-orange-color transition-colors"
            >
              Cadastre-se
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

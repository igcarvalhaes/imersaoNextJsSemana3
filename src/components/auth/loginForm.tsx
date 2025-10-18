// src/components/auth/loginForm.tsx
"use client";

import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mostrar senha
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha incorretos");
        return;
      }

      // Sucesso - redireciona para posts
      router.push("/posts");
      router.refresh();
    } catch (error) {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/posts" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-12">
        <h1 className="text-slate-900 text-3xl font-bold">Entrar</h1>
        <p className="text-[15px] mt-6 text-slate-600">
          Não possui uma conta?{" "}
          <Link
            href="/cadastro"
            className="text-main-orange-color font-medium hover:underline ml-1 whitespace-nowrap"
          >
            Cadastre-se aqui
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="text-slate-900 text-[13px] font-medium block mb-2">
          Email
        </label>
        <div className="relative flex items-center">
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-main-orange-color pl-2 pr-8 py-3 outline-none"
            placeholder="joao@serrajr.com"
          />
          <Mail className="w-[18px] h-[18px] absolute right-2 stroke-slate-300" />
        </div>
      </div>

      <div className="mt-8">
        <label className="text-slate-900 text-[13px] font-medium block mb-2">
          Senha
        </label>
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-main-orange-color pl-2 pr-8 py-3 outline-none"
            placeholder="Digite a senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 hover:opacity-70 transition-opacity"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="w-[18px] h-[18px] stroke-slate-300" />
            ) : (
              <Eye className="w-[18px] h-[18px] stroke-slate-300" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-12">
        <button
          type="submit"
          disabled={loading}
          className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-main-orange-color hover:bg-bright-orange-color focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>

      <div className="my-6 flex items-center gap-4">
        <hr className="w-full border-slate-300" />
        <p className="text-sm text-slate-900 text-center">ou</p>
        <hr className="w-full border-slate-300" />
      </div>

      <div className="space-x-8 flex justify-center">
        <button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          className="border-0 outline-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/logos/google.svg"
            alt="Google"
            width={35}
            height={35}
          />
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignIn("github")}
          className="border-0 outline-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/logos/github.svg"
            alt="GitHub"
            width={35}
            height={35}
          />
        </button>
      </div>
    </form>
  );
}

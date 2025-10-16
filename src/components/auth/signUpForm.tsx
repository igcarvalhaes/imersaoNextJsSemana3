"use client";

import { Eye, Mail, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação de senhaa
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar conta");
      }

      // Sucesso - redireciona para login
      alert("Conta criada com sucesso! Faça login para continuar.");
      router.push("/login");
    } catch (error: any) {
      setError(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      <div>
        <label className="text-slate-900 text-[13px] font-medium block mb-2">
          Nome Completo
        </label>
        <div className="relative flex items-center">
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-main-orange-color pl-2 pr-8 py-3 outline-none"
            placeholder="João Silva"
          />
          <User className="w-[18px] h-[18px] absolute right-2 stroke-slate-300" />
        </div>
      </div>

      <div className="mt-8">
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-main-orange-color pl-2 pr-8 py-3 outline-none"
            placeholder="Mínimo 6 caracteres"
          />
          <Eye className="w-[18px] h-[18px] absolute right-2 stroke-slate-300" />
        </div>
      </div>

      <div className="mt-8">
        <label className="text-slate-900 text-[13px] font-medium block mb-2">
          Confirmar Senha
        </label>
        <div className="relative flex items-center">
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-main-orange-color pl-2 pr-8 py-3 outline-none"
            placeholder="Digite a senha novamente"
          />
          <Eye className="w-[18px] h-[18px] absolute right-2 stroke-slate-300" />
        </div>
      </div>

      <div className="mt-12">
        <button
          type="submit"
          disabled={loading}
          className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-main-orange-color hover:bg-bright-orange-color focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>
      </div>
    </form>
  );
}

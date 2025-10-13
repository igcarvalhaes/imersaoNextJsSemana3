import { Eye, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="grid md:grid-cols-2 items-center max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-4 py-4">
          <form>
            <div className="mb-12">
              <h1 className="text-slate-900 text-3xl font-bold">Cadastre-se</h1>
              <p className="text-[15px] mt-6 text-slate-600">
                Já possui uma conta?{" "}
                <Link
                  href="/login"
                  className="text-main-orange-color font-medium hover:underline ml-1 whitespace-nowrap"
                >
                  Entre aqui
                </Link>
              </p>
            </div>

            <div>
              <label className="text-slate-900 text-[13px] font-medium block mb-2">
                Nome Completo
              </label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
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
                className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-main-orange-color hover:bg-bright-orange-color focus:outline-none cursor-pointer"
              >
                Criar Conta
              </button>
            </div>
          </form>
        </div>

        <div className="w-full h-full flex items-center bg-main-orange-color rounded-xl p-8">
          <Image
            src="/images/logos/serracadastro.png"
            alt="login-image"
            width={400}
            height={400}
            className="w-full aspect-[12/12] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

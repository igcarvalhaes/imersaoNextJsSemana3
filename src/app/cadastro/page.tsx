import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/signUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-light-blue-zinc flex flex-col items-center justify-center p-4">
      <div className="grid bg-white md:grid-cols-2 items-center max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-4 py-4">
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

          {/* Componente Client isolado */}
          <SignUpForm />
        </div>

        <div className="w-full h-full hidden md:flex items-center bg-main-orange-color rounded-xl p-8">
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

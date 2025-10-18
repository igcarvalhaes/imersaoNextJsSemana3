// src/app/login/page.tsx
import { LoginForm } from "@/components/auth/loginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-light-blue-zinc flex flex-col items-center justify-center p-4">
      <div className="grid bg-white md:grid-cols-2 items-center max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-4 py-4">
          <LoginForm />
        </div>

        <div className="hidden md:flex w-full h-full items-center bg-main-orange-color rounded-xl p-8">
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

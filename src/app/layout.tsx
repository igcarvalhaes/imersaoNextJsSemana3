import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Importa fonte do Google Fonts
import "./globals.css";

// Importa componentes compartilhados
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Configuração da fonte Poppins otimizada pelo Next.js
const poppins = Poppins({
  variable: "--font-poppins", // Cria variável CSS
  subsets: ["latin"], // Conjunto de caracteres
  weight: ["400", "700"], // Pesos: normal e bold
});

// Metadados da aplicação (SEO)
export const metadata: Metadata = {
  title: "IMERSÃO NEXT.JS",
  description: "Projeto desenvolvido durante a Imersão Next.js da SerraJr",
};

// Layout raiz - aplicado em todas as páginas
export default function RootLayout({
  children, // Conteúdo das páginas filhas
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col`}
      >
        {/* Header fixo em todas as páginas */}
        <Header />

        {/* Main cresce para ocupar espaço disponível */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer sempre visível na base */}
        <Footer />
      </body>
    </html>
  );
}

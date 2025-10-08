import Image from "next/image"; // Componente otimizado para imagens

// Página inicial - rota "/"
export default function Home() {
  return (
    // Container principal - centraliza vertical e horizontalmente
    <div className="flex flex-col items-center justify-center flex-1">
      {/* Card principal com cores customizadas */}
      <div className="h-[26rem] w-[20rem] md:w-[44rem] bg-main-orange-color flex flex-col items-center rounded-4xl">
        {/* Header do card - cor azul escura */}
        <div className="h-20 bg-dark-blue-color w-full flex items-center justify-center rounded-t-4xl">
          <h2 className="text-white text-3xl">Imersão NextJs</h2>
        </div>

        {/* Área do conteúdo - responsiva: coluna em mobile, linha em tablet+ */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-evenly w-full gap-4 md:gap-0">
          {/* Logo Next.js 1 - tamanho responsivo */}
          <Image
            src="/images/logos/nextjslogo.png" // Caminho público
            alt="logo do nextjs"
            width={288} // Largura desktop
            height={174} // Altura desktop
            className="w-48 h-28 md:w-72 md:h-44" // Responsive: menor em mobile
          />

          {/* Logo Next.js 2 - formato quadrado responsivo */}
          <Image
            src="/images/logos/nextjslogo2.png"
            alt="logo do nextjs"
            width={225} // Largura desktop
            height={225} // Altura desktop
            className="w-32 h-32 md:w-56 md:h-56" // Responsive: menor em mobile
          />
        </div>
      </div>
    </div>
  );
}

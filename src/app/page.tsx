import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // Container principal - centraliza vertical e horizontalmente
    <div className="flex flex-col items-center justify-center flex-1 bg-dark-gray-blue-zinc px-4">
      <div className="flex flex-col items-center w-full max-w-[1112px] gap-6 md:gap-12 md:h-[415px]">
        {/* Título - Mobile: text-4xl, Desktop: text-7xl */}
        <h1 className="text-4xl md:text-7xl text-center font-bold text-white">
          Imersão <span className="text-main-orange-color">Next.js</span>: Do
          Zero ao Deploy
        </h1>

        {/* Parágrafo - Mobile: text-lg, Desktop: text-3xl */}
        <p className="text-lg md:text-3xl text-center text-light-gray">
          Aprenda a construir aplicações web modernas com Next.js, do conceito
          inicial à implantação final. Domine as melhores práticas e as
          ferramentas essenciais para o desenvolvimento front-end.
        </p>

        {/* Botão - Mobile: w-full, Desktop: w-70 */}
        <Link
          href="/cadastro"
          className="inline-flex items-center justify-center w-full md:w-70 h-12 md:h-14 bg-main-orange-color text-white text-sm md:text-[15px] font-semibold rounded-md hover:bg-bright-orange-color transition-colors"
        >
          Comece a aprender
        </Link>
      </div>
    </div>
  );
}

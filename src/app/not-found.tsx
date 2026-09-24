import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata = {
    title: "Página não encontrada",
};

export default function NotFound() {
    return (
        <main className="w-full flex-1 flex flex-col justify-center px-6 md:px-8 py-20 md:py-28">
            <div className="flex flex-col gap-6 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    404 / Não Encontrado
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-tight">
                    O caminho requisitado não existe neste arquivo.
                </h1>

                <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    O link que você tentou acessar pode ter sido movido, renomeado ou removido durante a evolução do
                    portfólio.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button href="/" variant="primary" size="md">
                        <ArrowLeft
                            size={16}
                            className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1"
                        />
                        <span>Página inicial</span>
                    </Button>

                    <Button href="/work" variant="secondary" size="md">
                        <span>Ver projetos</span>
                    </Button>
                </div>

                <div className="w-full h-px bg-neutral-800/60 my-4" />

                <div className="flex flex-col gap-2 font-mono text-xs text-neutral-500">
                    <span className="uppercase tracking-wider">Rotas diretas:</span>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/work"
                            className="text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                        >
                            <span>/work</span>
                            <ArrowUpRight size={12} />
                        </Link>
                        <Link
                            href="/about"
                            className="text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                        >
                            <span>/about</span>
                            <ArrowUpRight size={12} />
                        </Link>
                        <Link
                            href="/contact"
                            className="text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                        >
                            <span>/contact</span>
                            <ArrowUpRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

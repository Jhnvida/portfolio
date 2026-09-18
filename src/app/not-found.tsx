import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";

export const metadata = {
    title: "Página não encontrada",
};

export default function NotFound() {
    return (
        <main className="w-full flex-1 flex flex-col items-center justify-center px-6 md:px-8 py-24 md:py-32 text-center">
            <div className="flex flex-col items-center gap-6 max-w-md">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100">
                    Página não encontrada
                </h1>

                <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    O link que você acessou pode ter sido movido, renomeado ou não existe mais neste arquivo.
                </p>

                <div className="pt-2">
                    <Button href="/" variant="primary" size="md">
                        <ArrowLeft
                            size={16}
                            className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1"
                        />
                        <span>Voltar para o início</span>
                    </Button>
                </div>
            </div>
        </main>
    );
}

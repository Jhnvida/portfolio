import { Page } from "../components/layout/Page";
import { Button } from "../components/ui/Button";
import { enter } from "../lib/motion";

export const metadata = {
    title: "Página não encontrada",
};

export default function NotFound() {
    return (
        <Page className="flex flex-1 flex-col items-center justify-center px-4 min-[380px]:px-6 py-20 text-center sm:py-36">
            <div className="flex max-w-lg flex-col items-center gap-6">
                <span {...enter(0)} className="text-meta uppercase tracking-[0.08em] text-ink-3">
                    404 · Não Encontrado
                </span>

                <h1 {...enter(1)} className="text-display font-medium text-ink">
                    Esta página não existe ou foi movida.
                </h1>

                <p {...enter(2)} className="text-body text-ink-2">
                    O link que você tentou acessar não está disponível na versão atual do arquivo.
                </p>

                <div {...enter(3)} className="mt-4 flex flex-wrap justify-center items-center gap-3">
                    <Button href="/" variant="primary">
                        Voltar para a página inicial
                    </Button>
                </div>
            </div>
        </Page>
    );
}

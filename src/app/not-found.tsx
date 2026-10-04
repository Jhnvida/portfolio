import { Button } from "../components/ui/Button";

export const metadata = {
    title: "Página não encontrada",
};

export default function NotFound() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-28 text-center sm:py-36">
            <div className="flex max-w-lg flex-col items-center gap-6">
                <span className="text-meta uppercase tracking-wider text-ink-3">404 · Não Encontrado</span>

                <h1 className="text-display font-medium text-ink">Esta página não existe ou foi movida.</h1>

                <p className="text-body text-ink-2">
                    O link que você tentou acessar não está disponível na versão atual do arquivo.
                </p>

                <div className="mt-4 flex items-center gap-3">
                    <Button href="/" variant="primary">
                        Página inicial
                    </Button>
                    <Button href="/work" variant="secondary">
                        Ver projetos
                    </Button>
                </div>
            </div>
        </main>
    );
}

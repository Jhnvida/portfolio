import Link from "next/link";

export const metadata = {
    title: "Página não encontrada",
};

export default function NotFound() {
    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6">404</p>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white leading-none mb-8">
                Página não encontrada
            </h1>
            <p className="text-neutral-400 text-lg max-w-sm leading-relaxed mb-12">
                A página que você está procurando não existe ou foi movida.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
            >
                ← Voltar para o início
            </Link>
        </main>
    );
}

import { ContextWeather } from "../components/home/ContextWeather";
import { LayoutGrid } from "../components/layout/LayoutGrid";
import { Page } from "../components/layout/Page";
import { Button } from "../components/ui/Button";

export default function HomePage() {
    return (
        <Page className="flex flex-col">
            <section className="w-full pt-16 pb-24 sm:pt-24 sm:pb-32">
                <LayoutGrid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col gap-8">
                        <ContextWeather />

                        <div className="flex flex-col gap-6">
                            <h1 className="text-display font-medium text-ink leading-[1.22] tracking-[-0.03em]">
                                Sou João Vida, desenvolvedor de software focado em construir sistemas que funcionam com
                                clareza e interfaces que parecem naturais na tela.
                            </h1>

                            <p className="text-body text-ink-2 leading-relaxed">
                                Gosto do desafio de transformar processos complexos em ferramentas simples e agradáveis de
                                usar. Nos últimos anos, trabalhei no desenvolvimento e na evolução de aplicações web reais —
                                lidando tanto com a criação de interfaces responsivas quanto com a estruturação de APIs REST
                                e a otimização de bancos de dados para operações críticas.
                            </p>

                            <p className="text-body text-ink-2 leading-relaxed">
                                Sempre tive interesse genuíno pelo ponto de encontro entre rigor técnico e cuidado visual.
                                Enxergo o código como um meio de dar vida a soluções sólidas, onde cada detalhe de
                                espaçamento, tipografia e fluxo de dados existe por um motivo claro.
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <Button href="/work" variant="primary">
                                    Ver projetos
                                </Button>
                                <Button href="/about" variant="secondary">
                                    Mais sobre mim
                                </Button>
                            </div>
                        </div>
                    </div>
                </LayoutGrid>
            </section>
        </Page>
    );
}

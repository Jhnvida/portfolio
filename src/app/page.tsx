import { ContextWeather } from "../components/home/ContextWeather";
import { HomeHeroMotion } from "../components/home/HomeHeroMotion";
import { LayoutGrid } from "../components/layout/LayoutGrid";
import { Page } from "../components/layout/Page";
import { Button } from "../components/ui/Button";
import { CONTACT_ANCHOR } from "../data/site";

export default function HomePage() {
    return (
        <Page className="flex flex-col">
            <section className="w-full pt-16 pb-24 sm:pt-24 sm:pb-32">
                <LayoutGrid>
                    <HomeHeroMotion>
                        <div data-hero-part>
                            <ContextWeather />
                        </div>

                        <div className="flex flex-col gap-6">
                            <h1
                                data-hero-part
                                className="text-display font-medium text-ink leading-[1.22] tracking-[-0.03em]"
                            >
                                Sou João Vida, desenvolvedor de software. Crio sites e interfaces digitais com rigor
                                técnico e cuidado visual.
                            </h1>

                            <p data-hero-part className="text-body text-ink-2 leading-relaxed">
                                Uno minha experiência em desenvolvimento web à atenção aos detalhes de cada interface —
                                da tipografia ao comportamento em diferentes telas. Desenvolvo projetos sob medida para
                                quem precisa de um site bem construído, funcional e fácil de usar. Estou aberto a novos
                                projetos e disponível para conversar sobre a sua ideia.
                            </p>

                            <div data-hero-part className="mt-4 flex flex-wrap items-center gap-3">
                                <Button href={`#${CONTACT_ANCHOR}`} variant="primary">
                                    Conversar sobre um projeto
                                </Button>
                                <Button href="/work" variant="secondary">
                                    Ver projetos
                                </Button>
                            </div>
                        </div>
                    </HomeHeroMotion>
                </LayoutGrid>
            </section>
        </Page>
    );
}

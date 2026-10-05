import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContextWeather } from "../components/home/ContextWeather";
import { HomeHeroMotion } from "../components/home/HomeHeroMotion";
import { HomeSectionMotion, HomeWorkMotion } from "../components/home/HomeWorkMotion";
import { LayoutGrid } from "../components/layout/LayoutGrid";
import { Page } from "../components/layout/Page";
import { Button } from "../components/ui/Button";
import { ListRow } from "../components/ui/ListRow";
import { SectionHeader } from "../components/ui/SectionHeader";
import { WorkFeaturedProjects } from "../components/work/WorkFeaturedProjects";
import { PROJECTS } from "../data/projects";
import { CONTACT_ANCHOR } from "../data/site";

export default function HomePage() {
    return (
        <Page className="flex flex-col">
            <section className="w-full pt-16 pb-16 sm:pt-24 sm:pb-20">
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

            <section className="w-full pb-20 sm:pb-24">
                <LayoutGrid>
                    <HomeWorkMotion>
                        <SectionHeader
                            title="Projetos em Destaque"
                            data-home-work-header
                            action={
                                <Link
                                    href="/work"
                                    className="group inline-flex items-center gap-1 text-meta text-ink-2 hover:text-ink transition-colors duration-200"
                                >
                                    <span>Ver arquivo completo</span>
                                    <ArrowUpRight
                                        aria-hidden
                                        size={14}
                                        strokeWidth={2}
                                        className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </Link>
                            }
                        />

                        <WorkFeaturedProjects projects={PROJECTS}>
                            <div className="flex flex-col">
                                {PROJECTS.map((project) => (
                                    <div key={project.id} data-home-work-item>
                                        <ListRow
                                            href={`/work/${project.slug}`}
                                            title={project.title}
                                            subtitle={`${project.category} · ${project.stack.join(" · ")}`}
                                            value={project.year}
                                            previewImage={project.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </WorkFeaturedProjects>
                    </HomeWorkMotion>
                </LayoutGrid>
            </section>

            <section className="w-full pb-24 sm:pb-32">
                <LayoutGrid>
                    <HomeSectionMotion>
                        <SectionHeader title="Capacidades & Escopos de Atuação" data-home-section-header />

                        <div className="flex flex-col">
                            <div data-home-section-item>
                                <ListRow
                                    title="Sites Institucionais & Editoriais"
                                    subtitle="Páginas rápidas, tipografia refinada e atenção a design responsivo"
                                    value="Design & Front-End"
                                    stackedOnMobile
                                />
                            </div>
                            <div data-home-section-item>
                                <ListRow
                                    title="Aplicações Web & Painéis"
                                    subtitle="Interfaces reativas com React ou Vue, integração com APIs REST e bancos de dados"
                                    value="Full Stack"
                                    stackedOnMobile
                                />
                            </div>
                            <div data-home-section-item>
                                <ListRow
                                    title="Design de Interação & Motion"
                                    subtitle="Microinterações fluidas, transições de estado e respeito a acessibilidade"
                                    value="UI & Motion"
                                    stackedOnMobile
                                />
                            </div>
                        </div>
                    </HomeSectionMotion>
                </LayoutGrid>
            </section>
        </Page>
    );
}

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Weather } from "../components/home/Weather";
import { Grid } from "../components/layout/Grid";
import { Page } from "../components/layout/Page";
import { ProjectList } from "../components/projects/ProjectList";
import { Button } from "../components/ui/Button";
import { ListRow } from "../components/ui/ListRow";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeader } from "../components/ui/SectionHeader";
import { getFeaturedProjects } from "../data/projects";
import { CONTACT_ANCHOR } from "../data/site";
import { enter } from "../lib/motion";

export default function HomePage() {
    const featuredProjects = getFeaturedProjects();

    return (
        <Page className="flex flex-col">
            <section className="w-full pt-16 pb-16 sm:pt-24 sm:pb-20">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col gap-8">
                        <div {...enter(0)}>
                            <Weather />
                        </div>

                        <div className="flex flex-col gap-6">
                            <h1
                                {...enter(1)}
                                className="text-display font-medium text-ink leading-[1.22] tracking-[-0.03em]"
                            >
                                Sou João Vida, desenvolvedor de software. Crio sites e interfaces digitais com rigor
                                técnico e cuidado visual.
                            </h1>

                            <p {...enter(2)} className="text-body text-ink-2 leading-relaxed">
                                Uno minha experiência em desenvolvimento web à atenção aos detalhes de cada interface —
                                da tipografia ao comportamento em diferentes telas. Desenvolvo projetos sob medida para
                                quem precisa de um site bem construído, funcional e fácil de usar. Estou aberto a novos
                                projetos e disponível para conversar sobre a sua ideia.
                            </p>

                            <div {...enter(3)} className="mt-4 flex flex-wrap items-center gap-3">
                                <Button href={`#${CONTACT_ANCHOR}`} variant="primary">
                                    Conversar sobre um projeto
                                </Button>
                                <Button href="/work" variant="secondary">
                                    Ver projetos
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </section>

            <section className="w-full pb-20 sm:pb-24">
                <Grid>
                    <Reveal stagger className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                        <SectionHeader
                            title="Projetos em Destaque"
                            data-reveal-item=""
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

                        <ProjectList projects={featuredProjects}>
                            <div className="flex flex-col">
                                {featuredProjects.map((project) => (
                                    <div key={project.id} data-reveal-item="">
                                        <ListRow
                                            href={`/work/${project.slug}`}
                                            title={project.title}
                                            value={project.year}
                                            previewImage={project.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </ProjectList>
                    </Reveal>
                </Grid>
            </section>

            <section className="w-full pb-24 sm:pb-32">
                <Grid>
                    <Reveal stagger className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                        <SectionHeader title="Capacidades & Escopos de Atuação" data-reveal-item="" />

                        <div className="flex flex-col">
                            <div data-reveal-item="">
                                <ListRow title="Sites Institucionais & Editoriais" value="Design & Front-End" />
                            </div>
                            <div data-reveal-item="">
                                <ListRow title="Aplicações Web & Painéis" value="Full Stack" />
                            </div>
                            <div data-reveal-item="">
                                <ListRow title="Design de Interação & Motion" value="UI & Motion" />
                            </div>
                        </div>
                    </Reveal>
                </Grid>
            </section>
        </Page>
    );
}

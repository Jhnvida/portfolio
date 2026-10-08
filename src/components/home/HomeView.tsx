"use client";

import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { CONTACT_ANCHOR } from "../../data/site";
import { enter } from "../../lib/motion";
import { ProjectSummary } from "../../types";
import { Grid } from "../layout/Grid";
import { Header } from "../layout/Header";
import { Page } from "../layout/Page";
import { Section } from "../layout/Section";
import { useSheet } from "../providers/SheetProvider";
import { Button } from "../ui/Button";

interface HomeViewProps {
    weather: ReactNode;
    featuredProjects?: ProjectSummary[];
}

export function HomeView({}: HomeViewProps) {
    const { openWork, openAbout } = useSheet();

    return (
        <Page className="flex flex-col">
            <Header />

            <Section className="pt-16 sm:pt-24 pb-16 sm:pb-24">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-start text-left">
                        <h1 {...enter(0)} className="text-hero font-medium text-ink text-balance max-w-xl">
                            Precisa de um site? Vamos fazer um bem feito.
                        </h1>

                        <p {...enter(1)} className="mt-4 sm:mt-5 text-lead text-ink-2 leading-relaxed max-w-lg">
                            Desenho e programo sites do zero — cuidando do visual, do código e de deixar tudo leve e
                            fácil de navegar.
                        </p>

                        <div {...enter(2)} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
                            <Button
                                href={`#${CONTACT_ANCHOR}`}
                                variant="primary"
                                endIcon={
                                    <ArrowUpRight
                                        aria-hidden
                                        size={14}
                                        strokeWidth={2}
                                        className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                }
                            >
                                Mandar mensagem
                            </Button>
                            <Button variant="secondary" onClick={openWork}>
                                Ver projetos
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Section>

            <Section className="py-14 sm:py-20">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-start text-left">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-4 sm:mb-5">Projetos</span>

                        <p className="text-lead text-ink-2 leading-relaxed max-w-lg">
                            Alguns trabalhos que desenvolvi recentemente, do design à implementação.
                        </p>

                        <div className="pt-6 sm:pt-8 flex justify-start">
                            <Button
                                onClick={openWork}
                                endIcon={
                                    <ArrowUpRight
                                        aria-hidden
                                        size={14}
                                        strokeWidth={2}
                                        className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                }
                            >
                                Ver projetos
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Section>

            <Section className="py-14 sm:py-20">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-start text-left">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-4 sm:mb-5">Sobre</span>

                        <p className="text-lead text-ink-2 leading-relaxed max-w-lg">
                            Desenvolvedor focado em interfaces web. Gosto de código limpo, boa tipografia e coisas que
                            funcionam sem complicação.
                        </p>

                        <div className="pt-6 sm:pt-8 flex justify-start">
                            <Button
                                onClick={openAbout}
                                endIcon={
                                    <ArrowUpRight
                                        aria-hidden
                                        size={14}
                                        strokeWidth={2}
                                        className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                }
                            >
                                Conhecer trajetória
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Section>
        </Page>
    );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { enter } from "../../lib/motion";
import { ProjectSummary } from "../../types";
import { Grid } from "../layout/Grid";
import { Page } from "../layout/Page";
import { Section } from "../layout/Section";
import { useSheet } from "../providers/SheetProvider";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

interface HomeViewProps {
    weather: ReactNode;
    featuredProjects?: ProjectSummary[];
}

export function HomeView({ weather }: HomeViewProps) {
    const { openWork, openAbout } = useSheet();

    return (
        <Page className="flex flex-col">
            <Section className="pt-16 sm:pt-24 pb-20 sm:pb-28">
                <Grid>
                    <div
                        {...enter(0)}
                        className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 pb-16 sm:pb-20 text-meta text-ink-3"
                    >
                        <Logo />
                        <div>{weather}</div>
                    </div>

                    <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                        <h1
                            {...enter(1)}
                            className="text-[clamp(2.125rem,1.5rem+3vw,3.5rem)] font-medium text-ink leading-[1.14] tracking-[-0.035em]"
                        >
                            Construo produtos digitais e interfaces web onde código, tipografia e usabilidade precisam
                            fazer sentido juntos.
                        </h1>
                    </div>
                </Grid>
            </Section>

            <Section className="py-20 sm:py-28">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-start text-left">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-6">Projetos</span>

                        <p className="text-[clamp(1.125rem,1rem+0.5vw,1.25rem)] text-ink leading-relaxed font-normal max-w-2xl">
                            Desenvolvo produtos digitais e interfaces web com foco em código limpo, usabilidade e
                            atenção aos detalhes. Cada projeto equilibra engenharia e experiência visual.
                        </p>

                        <div className="pt-8 sm:pt-10 flex justify-start">
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
                                Ver todos os projetos
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Section>

            <Section className="py-20 sm:py-28">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-start text-left">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-6">Sobre</span>

                        <p className="text-[clamp(1.125rem,1rem+0.5vw,1.25rem)] text-ink leading-relaxed font-normal max-w-2xl">
                            Minha atuação combina engenharia de software e atenção à experiência de quem navega. Crio
                            interfaces claras e cuidadosas, apoiadas por uma base técnica consistente.
                        </p>

                        <div className="pt-8 sm:pt-10 flex justify-start">
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

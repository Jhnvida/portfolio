import type { Metadata } from "next";
import { Grid } from "../../components/layout/Grid";
import { Page } from "../../components/layout/Page";
import { ProjectList } from "../../components/projects/ProjectList";
import { ListRow } from "../../components/ui/ListRow";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { PROJECTS } from "../../data/projects";
import { enter } from "../../lib/motion";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Arquivo e catálogo de projetos desenvolvidos por João Vida.",
};

export default function WorkPage() {
    return (
        <Page className="flex flex-col pt-16 pb-24 sm:pt-24 sm:pb-32">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                    <SectionHeader title="Projetos em Destaque" {...enter(0)} />

                    <ProjectList projects={PROJECTS}>
                        <div className="flex flex-col">
                            {PROJECTS.map((project, idx) => (
                                <div key={project.id} {...enter(1 + idx)}>
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
                    </ProjectList>

                    <div className="pt-20 sm:pt-24">
                        <SectionHeader title="Arquivo & Trajetória" {...enter(PROJECTS.length + 1)} />

                        <div className="flex flex-col">
                            <div {...enter(PROJECTS.length + 2)}>
                                <ListRow
                                    title="Assist Soluções em TI"
                                    muted
                                    subtitle="Sistemas web, APIs REST e otimização de bancos de dados SQL"
                                    value="2024–26"
                                    stackedOnMobile
                                />
                            </div>
                            <div {...enter(PROJECTS.length + 3)}>
                                <ListRow
                                    title="UniFAJ — Ciência da Computação"
                                    muted
                                    subtitle="Projetos acadêmicos, estruturas de dados e arquitetura de software"
                                    value="2023–26"
                                    stackedOnMobile
                                />
                            </div>
                            <div {...enter(PROJECTS.length + 4)}>
                                <ListRow
                                    title="ETEC Pedro Ferreira Alves"
                                    muted
                                    subtitle="Técnico em Informática para Internet · Fundamentos web e programação"
                                    value="2020–22"
                                    stackedOnMobile
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Page>
    );
}

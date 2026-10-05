import type { Metadata } from "next";
import { LayoutGrid } from "../../components/layout/LayoutGrid";
import { Page } from "../../components/layout/Page";
import { ListRow } from "../../components/ui/ListRow";
import { WorkMotion } from "../../components/work/WorkMotion";
import { PROJECTS } from "../../data/projects";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Arquivo e catálogo de projetos desenvolvidos por João Vida.",
};

export default function WorkPage() {
    return (
        <Page className="flex flex-col pt-16 pb-24 sm:pt-24 sm:pb-32">
            <LayoutGrid>
                <WorkMotion>
                    <div data-work-header-featured className="mb-8">
                        <span className="text-meta text-ink-3">Projetos em Destaque</span>
                    </div>

                    <div className="flex flex-col">
                        {PROJECTS.map((project) => (
                            <div key={project.id} data-work-item-featured>
                                <ListRow
                                    href={`/work/${project.slug}`}
                                    title={project.title}
                                    subtitle={`${project.category} · ${project.stack.join(" · ")}`}
                                    value={project.year}
                                />
                            </div>
                        ))}
                    </div>

                    <div data-work-divider className="mt-16 border-t border-line" />

                    <div data-work-header-archive className="pt-12 mb-6">
                        <span className="text-meta text-ink-3">Arquivo & Trajetória</span>
                    </div>

                    <div className="flex flex-col">
                        <div data-work-item-archive>
                            <ListRow
                                title="Assist Soluções em TI"
                                muted
                                subtitle="Sistemas web, APIs REST e otimização de bancos de dados SQL"
                                value="2024–26"
                            />
                        </div>
                        <div data-work-item-archive>
                            <ListRow
                                title="UniFAJ — Ciência da Computação"
                                muted
                                subtitle="Projetos acadêmicos, estruturas de dados e arquitetura de software"
                                value="2023–26"
                            />
                        </div>
                        <div data-work-item-archive>
                            <ListRow
                                title="ETEC Pedro Ferreira Alves"
                                muted
                                subtitle="Técnico em Informática para Internet · Fundamentos web e programação"
                                value="2020–22"
                            />
                        </div>
                    </div>
                </WorkMotion>
            </LayoutGrid>
        </Page>
    );
}

import type { Metadata } from "next";
import { LayoutGrid } from "../../components/layout/LayoutGrid";
import { Page } from "../../components/layout/Page";
import { ListRow } from "../../components/ui/ListRow";
import { PROJECTS } from "../../data/projects";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Arquivo e catálogo de projetos desenvolvidos por João Vida.",
};

export default function WorkPage() {
    return (
        <Page className="flex flex-col pt-16 pb-24 sm:pt-24 sm:pb-32">
            <LayoutGrid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                    <div className="mb-8">
                        <span className="text-meta text-ink-3">Projetos em Destaque</span>
                    </div>

                    <div className="flex flex-col">
                        {PROJECTS.map((project) => (
                            <ListRow
                                key={project.id}
                                href={`/work/${project.slug}`}
                                title={project.title}
                                subtitle={`${project.category} · ${project.stack.join(" · ")}`}
                                value={project.year}
                            />
                        ))}
                    </div>

                    <div className="mt-16 mb-6 pt-12 border-t border-line">
                        <span className="text-meta text-ink-3">Arquivo & Trajetória</span>
                    </div>

                    <div className="flex flex-col">
                        <ListRow
                            title="Assist Soluções em TI"
                            muted
                            subtitle="Sistemas web, APIs REST e otimização de bancos de dados SQL"
                            value="2024–26"
                        />
                        <ListRow
                            title="UniFAJ — Ciência da Computação"
                            muted
                            subtitle="Projetos acadêmicos, estruturas de dados e arquitetura de software"
                            value="Conclusão 2026"
                        />
                        <ListRow
                            title="ETEC Pedro Ferreira Alves"
                            muted
                            subtitle="Técnico em Informática para Internet · Fundamentos web e programação"
                            value="2020–22"
                        />
                    </div>
                </div>
            </LayoutGrid>
        </Page>
    );
}

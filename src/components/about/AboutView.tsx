import { cn } from "../../lib/utils";
import { ListRow } from "../ui/ListRow";
import { AboutMotion } from "./AboutMotion";

interface AboutViewProps {
    className?: string;
}

export function AboutView({ className }: AboutViewProps) {
    return (
        <AboutMotion>
            <div className={cn("flex w-full flex-col gap-20", className)}>
                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6 gap-y-12 items-start">
                    <div data-about-card className="col-span-4 sm:col-span-4 lg:col-span-4 flex flex-col gap-4">
                        <div className="flex flex-col justify-between rounded-panel bg-surface p-7 sm:p-8 aspect-4/5">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-meta text-ink-3">Perfil</span>
                                <span className="text-title font-medium text-ink">João Vida</span>
                                <span className="text-meta text-ink-2">Desenvolvedor Full Stack</span>
                            </div>

                            <div className="flex flex-col gap-3 pt-6 border-t border-line text-meta text-ink-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-ink-3">Localização</span>
                                    <span className="text-ink">Jaguariúna, SP</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-ink-3">Fuso Horário</span>
                                    <span className="text-ink">BRT (UTC−3)</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-ink-3">Idiomas</span>
                                    <span className="text-ink">Português (Nativo), Inglês</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-ink-3">Formação</span>
                                    <span className="text-ink">Ciência da Computação</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        data-about-bio
                        className="col-span-4 sm:col-span-4 lg:col-span-8 flex flex-col gap-6 text-body text-ink-2 leading-relaxed"
                    >
                        <p className="text-ink font-medium">
                            Minha atuação profissional combina engenharia de software full stack com um apreço constante
                            pela experiência de quem utiliza a aplicação.
                        </p>

                        <p>
                            Ao longo da minha trajetória, participei ativamente de projetos de ponta a ponta: do
                            levantamento e entendimento de regras de negócio à implementação de regras de backend,
                            consumo e criação de APIs REST e modelagem em bancos relacionais.
                        </p>

                        <p>
                            Gosto de trabalhar em equipes colaborativas sob metodologias ágeis, onde boas práticas de
                            versionamento, clareza na comunicação e foco no usuário guiam o dia a dia. Fora do ambiente
                            corporativo, dedico tempo para construir ferramentas autorais e explorar o estado da arte do
                            design digital.
                        </p>
                    </div>
                </div>

                <section data-about-section className="flex flex-col gap-6 pt-12 border-t border-line">
                    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6">
                        <div className="col-span-4 sm:col-span-3 lg:col-span-4 flex flex-col gap-1 mb-4 sm:mb-0">
                            <span className="text-meta text-ink-3">Trajetória</span>
                            <h2 className="text-title font-medium text-ink">Experiência Profissional</h2>
                        </div>

                        <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col">
                            <ListRow
                                title="Assist Soluções em TI"
                                subtitle="Desenvolvedor de Software Júnior · PHP, JavaScript, APIs REST e otimização SQL"
                                value="2024–26"
                            />
                            <ListRow
                                title="Assist Soluções em TI"
                                subtitle="Estagiário de Desenvolvimento · Manutenção de sistemas, melhorias de interface e consultas SQL"
                                value="2024"
                            />
                        </div>
                    </div>
                </section>

                <section data-about-section className="flex flex-col gap-6 pt-12 border-t border-line">
                    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6">
                        <div className="col-span-4 sm:col-span-3 lg:col-span-4 flex flex-col gap-1 mb-4 sm:mb-0">
                            <span className="text-meta text-ink-3">Educação</span>
                            <h2 className="text-title font-medium text-ink">Formação Acadêmica</h2>
                        </div>

                        <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col">
                            <ListRow
                                title="Centro Universitário de Jaguariúna (UniFAJ)"
                                subtitle="Bacharelado em Ciência da Computação"
                                value="2023–26"
                            />
                            <ListRow
                                title="ETEC Pedro Ferreira Alves"
                                subtitle="Técnico em Informática para Internet"
                                value="2020–22"
                            />
                        </div>
                    </div>
                </section>

                <section data-about-section className="flex flex-col gap-6 pt-12 border-t border-line">
                    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6">
                        <div className="col-span-4 sm:col-span-3 lg:col-span-4 flex flex-col gap-1 mb-4 sm:mb-0">
                            <span className="text-meta text-ink-3">Competências</span>
                            <h2 className="text-title font-medium text-ink">Tecnologias & Ferramentas</h2>
                        </div>

                        <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col">
                            <ListRow title="Linguagens" value="PHP · JavaScript · TypeScript" />
                            <ListRow title="Front-end" value="React · Vue.js · HTML5 · CSS3 · Tailwind CSS" />
                            <ListRow title="Back-end" value="Node.js · Express · PHP · APIs REST" />
                            <ListRow title="Bancos de Dados" value="MySQL · PostgreSQL" />
                            <ListRow title="Ferramentas & Práticas" value="Git · Docker · Metodologias Ágeis" />
                        </div>
                    </div>
                </section>
            </div>
        </AboutMotion>
    );
}

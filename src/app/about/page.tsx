import type { Metadata } from "next";
import { Grid } from "../../components/layout/Grid";
import { Page } from "../../components/layout/Page";
import { ListRow } from "../../components/ui/ListRow";
import { Reveal } from "../../components/ui/Reveal";
import { EXPERIENCES } from "../../data/experience";
import { SITE } from "../../data/site";
import { enter } from "../../lib/motion";

export const metadata: Metadata = {
    title: "Sobre",
    description: "Trajetória profissional, formação acadêmica e competências técnicas de João Vida.",
};

export default function AboutPage() {
    return (
        <Page className="flex flex-col pt-16 pb-24 sm:pt-24 sm:pb-32">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                    <div className="flex w-full flex-col gap-20">
                        <div {...enter(0)} className="mb-2">
                            <span className="text-meta text-ink-3">Sobre</span>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6 gap-y-10 lg:gap-y-12 items-start">
                            <div
                                {...enter(1)}
                                className="order-2 lg:order-1 col-span-4 sm:col-span-8 lg:col-span-4 flex flex-col gap-6"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-meta text-ink-3">Perfil</span>
                                    <h2 className="text-title font-medium text-ink">{SITE.name}</h2>
                                    <span className="text-meta text-ink-2">{SITE.role}</span>
                                </div>

                                <div className="flex flex-col gap-3 pt-6 border-t border-line text-meta text-ink-2 sm:grid sm:grid-cols-3 sm:gap-6 lg:flex lg:flex-col lg:gap-3">
                                    <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-1 lg:flex-row lg:items-center lg:justify-between">
                                        <span className="text-ink-3">Localização</span>
                                        <span className="text-ink">
                                            {SITE.location.city}, {SITE.location.region}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-1 lg:flex-row lg:items-center lg:justify-between">
                                        <span className="text-ink-3">Fuso Horário</span>
                                        <span className="text-ink">{SITE.location.timeZoneLabel}</span>
                                    </div>

                                    <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-1 lg:flex-row lg:items-center lg:justify-between">
                                        <span className="text-ink-3">Idiomas</span>
                                        <span className="text-ink">Português, Inglês</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                {...enter(1)}
                                className="order-1 lg:order-2 col-span-4 sm:col-span-8 lg:col-span-8 flex flex-col gap-6 text-body text-ink-2 leading-relaxed"
                            >
                                <p className="text-ink font-medium">
                                    Minha atuação combina engenharia de software e atenção à experiência de quem navega.
                                    Gosto de criar interfaces claras, cuidadosas e agradáveis de usar, apoiadas por uma
                                    base técnica bem construída.
                                </p>

                                <p>
                                    Na minha experiência profissional, trabalhei no desenvolvimento e na evolução de
                                    aplicações web, participando de diferentes etapas — do entendimento das necessidades
                                    à implementação de interfaces, APIs e integrações. Essa vivência fortaleceu meu
                                    olhar para além da tela: um bom produto também precisa funcionar bem por dentro.
                                </p>

                                <p>
                                    Nos projetos autorais, exploro especialmente o encontro entre tecnologia, tipografia
                                    e movimento. Também estou aberto a desenvolver sites e experiências digitais para
                                    quem busca esse cuidado visual aliado a uma construção técnica consistente.
                                </p>
                            </div>
                        </div>

                        <Reveal as="section" className="flex flex-col pt-12 sm:pt-14 border-t border-line">
                            <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6 gap-y-6 sm:gap-y-0 items-start">
                                <div className="col-span-4 sm:col-span-3 lg:col-span-4 flex flex-col gap-1">
                                    <span className="text-meta text-ink-3">Trajetória</span>
                                    <h2 className="text-title font-medium text-ink">Experiência Profissional</h2>
                                </div>

                                <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col gap-8">
                                    {EXPERIENCES.map((exp) => (
                                        <div key={exp.company} className="flex flex-col">
                                            <h3 className="text-body font-medium text-ink pb-1">{exp.company}</h3>
                                            <div className="flex flex-col">
                                                {exp.roles.map((role) => (
                                                    <ListRow
                                                        key={`${role.title}-${role.period}`}
                                                        title={
                                                            <span className="font-medium text-ink">{role.title}</span>
                                                        }
                                                        value={role.period}
                                                        stackedOnMobile
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal as="section" className="flex flex-col pt-12 sm:pt-14 border-t border-line">
                            <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6 gap-y-6 sm:gap-y-0 items-start">
                                <div className="col-span-4 sm:col-span-3 lg:col-span-4 flex flex-col gap-1">
                                    <span className="text-meta text-ink-3">Educação</span>
                                    <h2 className="text-title font-medium text-ink">Formação Acadêmica</h2>
                                </div>

                                <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col">
                                    <ListRow title="Ciência da Computação · UniFAJ" value="2023–26" stackedOnMobile />
                                    <ListRow
                                        title="Técnico em Informática para Internet · ETEC"
                                        value="2020–22"
                                        stackedOnMobile
                                    />
                                </div>
                            </div>
                        </Reveal>

                        <Reveal as="section" className="flex flex-col pt-12 sm:pt-14 border-t border-line">
                            <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5 sm:gap-x-6 gap-y-6 sm:gap-y-0 items-start">
                                <div className="col-span-4 sm:col-span-3 lg:col-span-4 flex flex-col gap-1">
                                    <span className="text-meta text-ink-3">Competências</span>
                                    <h2 className="text-title font-medium text-ink">Tecnologias & Ferramentas</h2>
                                </div>

                                <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col">
                                    <ListRow title="Linguagens" value="PHP · JavaScript · TypeScript" stackedOnMobile />
                                    <ListRow
                                        title="Front-end"
                                        value="React · Vue.js · HTML5 · CSS3 · Tailwind CSS"
                                        stackedOnMobile
                                    />
                                    <ListRow
                                        title="Back-end"
                                        value="Node.js · Express · PHP · APIs REST"
                                        stackedOnMobile
                                    />
                                    <ListRow title="Bancos de Dados" value="MySQL · PostgreSQL" stackedOnMobile />
                                    <ListRow
                                        title="Ferramentas & Práticas"
                                        value="Git · Docker · Metodologias Ágeis"
                                        stackedOnMobile
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Grid>
        </Page>
    );
}

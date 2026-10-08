import { EXPERIENCES } from "../../data/experience";
import { enter } from "../../lib/motion";
import { Grid } from "../layout/Grid";
import { ListRow } from "../ui/ListRow";

export function AboutContent() {
    return (
        <div className="w-full">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col gap-12 sm:gap-16">
                    <div>
                        <h1
                            {...enter(0)}
                            className="text-display sm:text-[2.25rem] font-medium text-ink tracking-[-0.03em]"
                        >
                            Sobre
                        </h1>
                    </div>

                    <div {...enter(1)} className="flex flex-col gap-4 text-body text-ink-2 leading-relaxed">
                        <p className="text-ink font-medium text-body sm:text-[1.125rem]">
                            Minha atuação combina engenharia de software e atenção à experiência de quem navega. Gosto
                            de criar interfaces claras, cuidadosas e agradáveis de usar, apoiadas por uma base técnica
                            bem construída.
                        </p>

                        <p>
                            No dia a dia, trabalho no desenvolvimento de aplicações web — da modelagem de dados e
                            integração de APIs à lapidação das interfaces no front-end. Essa prática equilibra o rigor
                            técnico dos bastidores à sensibilidade visual de quem utiliza a solução.
                        </p>

                        <p>
                            Nos projetos autorais, exploro especialmente o encontro entre tecnologia, tipografia e
                            movimento.
                        </p>
                    </div>

                    <div {...enter(2)} className="flex flex-col border-t border-line/40 pt-8 sm:pt-10">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">Experiência</span>

                        <div className="flex flex-col gap-6">
                            {EXPERIENCES.map((exp) => (
                                <div key={exp.company} className="flex flex-col">
                                    <h2 className="text-body font-medium text-ink pb-1">{exp.company}</h2>
                                    <div className="flex flex-col">
                                        {exp.roles.map((role) => (
                                            <ListRow
                                                key={`${role.title}-${role.period}`}
                                                title={role.title}
                                                value={role.period}
                                                stackedOnMobile
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div {...enter(3)} className="flex flex-col border-t border-line/40 pt-8 sm:pt-10">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">Formação</span>

                        <div className="flex flex-col">
                            <ListRow title="Ciência da Computação · UniFAJ" value="2023-26" stackedOnMobile />
                            <ListRow
                                title="Técnico em Informática para Internet · ETEC"
                                value="2020-22"
                                stackedOnMobile
                            />
                        </div>
                    </div>

                    <div {...enter(4)} className="flex flex-col border-t border-line/40 pt-8 sm:pt-10">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">Tecnologias</span>

                        <div className="flex flex-col">
                            <ListRow title="Linguagens" value="JavaScript · TypeScript · PHP" stackedOnMobile />
                            <ListRow
                                title="Front-end"
                                value="React · Vue.js · HTML5 · CSS3 · Tailwind"
                                stackedOnMobile
                            />
                            <ListRow title="Back-end" value="Node.js · Express · PHP · REST" stackedOnMobile />
                            <ListRow title="Bancos de Dados" value="MySQL · PostgreSQL" stackedOnMobile />
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    );
}

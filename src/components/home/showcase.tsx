import { ArrowUpRight } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string;
    period: string;
    link: string;
}

const projects: Project[] = [
    {
        id: "assist-web",
        title: "Sustentação & Engenharia de Módulos Web",
        description:
            "Desenvolvimento e sustentação de sistemas web em ambiente de produção utilizando PHP, JavaScript e HTML5. Implementação e integração de APIs REST para comunicação estruturada entre módulos, além de otimização de rotinas e consultas relacionais SQL, gerando ganhos mensuráveis no tempo de resposta de relatórios internos.",
        technologies: "PHP, JavaScript, MySQL, APIs REST, Git",
        period: "2024 – 2026",
        link: "https://github.com/Jhnvida",
    },
    {
        id: "fullstack-platform",
        title: "Aplicações Web com TypeScript & React",
        description:
            "Construção de interfaces reativas com React, TypeScript e Tailwind CSS, consumindo serviços RESTful com tipagem estática ponta a ponta. Arquitetura orientada a componentes reutilizáveis, gerenciamento de estado previsível e redução de inconsistências em tempo de execução.",
        technologies: "React, TypeScript, Tailwind CSS, REST APIs",
        period: "2024 – 2026",
        link: "https://github.com/Jhnvida",
    },
    {
        id: "rest-api-core",
        title: "Serviços e APIs RESTful em Node.js",
        description:
            "Desenvolvimento de serviços e APIs em Node.js com Express e TypeScript. Implementação de rotas RESTful padronizadas, validação estruturada de esquemas, tratamento centralizado de exceções e persistência em bancos de dados relacionais.",
        technologies: "Node.js, Express, TypeScript, SQL, Docker",
        period: "2024 – 2025",
        link: "https://github.com/Jhnvida",
    },
];

export function Showcase() {
    return (
        <section id="work" className="scroll-mt-16 px-6 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
                <div className="divide-y divide-neutral-100">
                    {projects.map((project) => (
                        <article key={project.id} className="py-12 sm:py-16 first:pt-0 last:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                                <div className="md:col-span-7 flex flex-col justify-between">
                                    <div>
                                        <h2 className="font-heading text-xl sm:text-2xl font-medium tracking-tight text-neutral-950">
                                            {project.title}
                                        </h2>
                                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600 font-sans">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950"
                                        >
                                            <span>View project</span>
                                            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                                        </a>
                                    </div>
                                </div>

                                <div className="md:col-span-5 flex flex-col justify-between space-y-4 text-xs sm:text-sm font-sans md:text-right">
                                    <div>
                                        <span className="block text-xs font-medium text-neutral-400">Tecnologias</span>
                                        <span className="mt-1 block text-neutral-800">{project.technologies}</span>
                                    </div>

                                    <div>
                                        <span className="block text-xs font-medium text-neutral-400">Período</span>
                                        <span className="mt-1 block font-mono text-neutral-700">{project.period}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

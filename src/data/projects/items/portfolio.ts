import type { Project } from "../../../types/project";

export const portfolioProject: Project = {
    id: "1",
    title: "Portfólio",
    summary: "Um laboratório pessoal para testar interface, tipografia e movimento na web.",
    category: "Projeto Autoral",
    client: "Projeto Autoral",
    role: "Design & Desenvolvimento Front-End",
    impact: "Exploração de Interfaces & Motion",
    image: "/images/portfolio.png",
    slug: "portfolio",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    year: "2026",
    featured: true,
    githubUrl: "https://github.com/Jhnvida/portfolio",
    content: [
        {
            type: "media",
            layout: "full",
            items: [{ src: "/images/portfolio.png", type: "image", alt: "Visão geral do Portfólio" }],
        },
        {
            type: "editorial",
            title: "Por que decidi criar",
            paragraphs: [
                "Criei este espaço como um laboratório próprio: um lugar para testar ideias visuais, experimentar novas ferramentas da web e mostrar de verdade as coisas que venho construindo.",
                "Mais do que uma vitrine estática, quis que a navegação em si fosse prazerosa — explorando microinterações, tipografia fluida e uma estrutura de layout clara e intencional.",
            ],
        },
        {
            type: "editorial",
            title: "O que explorei",
            paragraphs: [
                "A implementação de um sistema de Layout Grid compartilhado baseado em 12 colunas, assegurando consistência espacial entre todas as páginas e seções da aplicação.",
                "O objetivo foi equilibrar rigor técnico e sensibilidade estética: construir interfaces responsivas, tipografia editorial legível e performance otimizada.",
            ],
        },
        {
            type: "editorial",
            title: "Como foi construído",
            paragraphs: [
                "Desenvolvido com Next.js (App Router), TypeScript e Tailwind CSS. A arquitetura prioriza componentização limpa, tokens de design sem dependências supérfluas e renderização estática rápida.",
            ],
            list: [
                "Layout Grid compartilhado de 12 colunas para desktop e adaptável a telas menores",
                "Componentização modular com Tailwind CSS e tokens tipográficos",
                "Acessibilidade e respeito às preferências de movimento do usuário",
            ],
        },
    ],
};

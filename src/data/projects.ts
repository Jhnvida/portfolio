import { Project } from "../types";

export const PROJECTS: Project[] = [
    {
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
    },
    {
        id: "2",
        title: "A Nossa Jornada",
        summary: "Uma linha do tempo interativa para guardar e reviver memórias especiais.",
        category: "Projeto Pessoal",
        client: "Projeto Pessoal",
        role: "Storytelling & Desenvolvimento Web",
        impact: "Linha do Tempo Interativa",
        image: "/images/our-journey.png",
        slug: "our-journey",
        stack: ["React", "TypeScript", "Vite", "React Router", "Supabase", "Motion"],
        year: "2026",
        featured: true,
        githubUrl: "https://github.com/Jhnvida/our-journey",
        content: [
            {
                type: "media",
                layout: "full",
                items: [{ src: "/images/our-journey.png", type: "image", alt: "Preview da linha do tempo" }],
            },
            {
                type: "editorial",
                title: "Por que decidi criar",
                paragraphs: [
                    "Uma plataforma interativa de storytelling e linha do tempo feita para guardar e reviver memórias especiais. O projeto nasceu do desejo de transformar lembranças em uma experiência digital acolhedora, fugindo da frieza das redes sociais convencionais.",
                ],
            },
            {
                type: "editorial",
                title: "O que explorei",
                paragraphs: [
                    "Como organizar dados cronológicos — datas, fotos, textos e pequenos relatos — em uma interface fluida que convidasse à leitura e transmitisse afeto através do design.",
                ],
            },
            {
                type: "editorial",
                title: "Como foi construído",
                paragraphs: [
                    "Desenvolvi a interface em React com TypeScript e Vite para manter o fluxo de desenvolvimento rápido e leve. As animações de entrada dos eventos foram feitas com Motion, e utilizei o Supabase para armazenamento e sincronização de dados de forma simples e direta.",
                ],
            },
        ],
    },
];

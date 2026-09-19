import { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "Portfólio",
        category: "Projeto Autoral",
        client: "Projeto Autoral",
        role: "Design & Desenvolvimento Front-End",
        impact: "Exploração de Interfaces & Motion",
        image: "/images/portfolio.png",
        slug: "portfolio",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
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
                    "Mais do que uma vitrine estática, quis que a navegação em si fosse prazerosa — explorando microinterações, tipografia fluida e animações que parecessem naturais.",
                ],
            },
            {
                type: "editorial",
                title: "O que explorei",
                paragraphs: [
                    "Queria entender na prática como orquestrar animações orientadas à rolagem sem pesar o carregamento ou comprometer a fluidez da página.",
                    "O objetivo era encontrar um equilíbrio: uma interface expressiva e com personalidade, mas que mantivesse a clareza e respeitasse a experiência de quem navega.",
                ],
            },
            {
                type: "editorial",
                title: "Como foi construído",
                paragraphs: [
                    "Usei Next.js com React e Tailwind CSS para a estrutura, integrando GSAP e Lenis para o controle de rolagem e efeitos sutis. O processo envolveu muitos testes de ritmo visual, espaçamento e acessibilidade para usuários que preferem movimento reduzido.",
                ],
                list: [
                    "Sincronização suave de rolagem com GSAP e Lenis",
                    "Componentização limpa com Tailwind CSS",
                    "Respeito às preferências de movimento reduzido",
                ],
            },
        ],
    },
    {
        id: "2",
        title: "A Nossa Jornada",
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

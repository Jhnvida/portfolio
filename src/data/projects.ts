import { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "Portfólio",
        client: "Projeto Pessoal",
        impact: "Performance e Imersão",
        image: "/images/portfolio.svg",
        slug: "portfolio",
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Lenis"],
        year: "2026",
        featured: true,
        githubUrl: "https://github.com/Jhnvida/portfolio",
        content: [
            {
                type: "media",
                layout: "full",
                items: [{ src: "/images/portfolio.svg", type: "image", alt: "Visão geral do Portfólio" }],
            },
            {
                type: "editorial",
                title: "Contexto",
                paragraphs: [
                    "Um metaestudo de caso sobre desenvolvimento criativo e engenharia front-end. O portfólio não apenas apresenta os projetos, mas atua como a própria demonstração das minhas capacidades técnicas em interações complexas, tipografia fluida e otimização extrema.",
                ],
            },
            {
                type: "editorial",
                title: "O Desafio",
                paragraphs: [
                    "Construir uma experiência rica em animações orientadas à rolagem (scroll-driven animations) sem sacrificar a performance (60fps), garantindo uma navegação coesa com um sistema de trilhos de progresso personalizado.",
                ],
            },
            {
                type: "editorial",
                title: "Solução",
                paragraphs: [
                    "Utilizei GSAP combinado com Lenis para a orquestração de uma rolagem extremamente suave e animações fixadas (pinned). A arquitetura de CSS moderno (Tailwind v4) foi essencial para criar layouts fluidos, resultando em um bundle eficiente.",
                ],
                list: [
                    "Sincronização entre GSAP e Lenis",
                    "Sistema de Design Componentizado",
                    "Acessibilidade de Motion respeitada",
                ],
            },
            {
                type: "media",
                layout: "grid-2",
                items: [
                    { src: "/images/portfolio.svg", type: "image", alt: "Detalhe 1" },
                    { src: "/images/portfolio.svg", type: "image", alt: "Detalhe 2" },
                ],
            },
        ],
    },
    {
        id: "2",
        title: "A Nossa Jornada",
        client: "Projeto Pessoal",
        impact: "Memórias Imersivas",
        image: "/images/our-journey.svg",
        slug: "our-journey",
        stack: ["React 19", "TypeScript", "Vite", "React Router", "Supabase", "Motion"],
        year: "2026",
        featured: true,
        githubUrl: "https://github.com/Jhnvida/our-journey",
        content: [
            {
                type: "media",
                layout: "full",
                items: [{ src: "/images/our-journey.svg", type: "image", alt: "Preview da linha do tempo" }],
            },
            {
                type: "editorial",
                title: "Contexto",
                paragraphs: [
                    "Uma plataforma interativa de storytelling e linha do tempo criada para registrar e reviver memórias importantes. O projeto traduz sentimentos em experiências visuais interativas por meio de um design sensível e delicado.",
                ],
            },
            {
                type: "editorial",
                title: "O Desafio",
                paragraphs: [
                    "Como organizar dados cronológicos (momentos, fotos e textos) de forma não linear ou iterativa, mantendo a sensação de uma jornada unificada e altamente interativa?",
                ],
            },
            {
                type: "editorial",
                title: "Solução Técnica",
                paragraphs: [
                    "Adotei o React Router para transições fluidas e o Supabase para persistência de dados em tempo real. A componentização robusta, combinada com Framer Motion (Motion), permite coreografar a entrada dos eventos na linha do tempo.",
                ],
            },
            {
                type: "media",
                layout: "grid-2",
                items: [
                    { src: "/images/our-journey.svg", type: "image", alt: "Detalhe 1" },
                    { src: "/images/our-journey.svg", type: "image", alt: "Detalhe 2" },
                ],
            },
        ],
    },
];

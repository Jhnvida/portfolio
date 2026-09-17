import { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "Portfólio",
        client: "Projeto Pessoal",
        category: "Engenharia Criativa & Design",
        impact: "Performance e Imersão",
        image: "/images/portfolio.svg",
        slug: "portfolio",
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Lenis"],
        year: "2026",
        overview:
            "Um metaestudo de caso sobre desenvolvimento criativo e engenharia front-end. O portfólio não apenas apresenta os projetos, mas atua como a própria demonstração das minhas capacidades técnicas em interações complexas, tipografia fluida e otimização extrema.",
        challenge:
            "Construir uma experiência rica em animações orientadas à rolagem (scroll-driven animations) sem sacrificar a performance (60fps), garantindo uma navegação coesa com um sistema de trilhos de progresso personalizado.",
        solution:
            "Utilizei GSAP combinado com Lenis para a orquestração de uma rolagem extremamente suave e animações fixadas (pinned). A arquitetura de CSS moderno (Tailwind v4) foi essencial para criar layouts fluidos, resultando em um bundle eficiente.",
        featured: true,
        githubUrl: "https://github.com/Jhnvida/portfolio",
    },
    {
        id: "2",
        title: "A Nossa Jornada",
        client: "Projeto Pessoal",
        category: "Storytelling Interativo & Aplicação Web",
        impact: "Memórias Imersivas",
        image: "/images/our-journey.svg",
        slug: "our-journey",
        stack: ["React 19", "TypeScript", "Vite", "React Router", "Supabase", "Motion"],
        year: "2026",
        overview:
            "Uma plataforma interativa de storytelling e linha do tempo criada para registrar e reviver memórias importantes. O projeto traduz sentimentos em experiências visuais interativas por meio de um design sensível e delicado.",
        challenge:
            "Como organizar dados cronológicos (momentos, fotos e textos) de forma não linear ou iterativa, mantendo a sensação de uma jornada unificada e altamente interativa?",
        solution:
            "Adotei o React Router para transições fluidas e o Supabase para persistência de dados em tempo real. A componentização robusta, combinada com Framer Motion (Motion), permite coreografar a entrada dos eventos na linha do tempo.",
        featured: true,
        githubUrl: "https://github.com/Jhnvida/our-journey",
    },
];

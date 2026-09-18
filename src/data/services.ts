import { ServiceItem } from "../types";

export const SERVICES: ServiceItem[] = [
    {
        id: "interfaces",
        number: "01",
        title: "Interfaces & Interatividade",
        tags: "React / GSAP / Tailwind CSS / Motion",
        description:
            "Gosto de projetar e desenvolver interfaces com cuidado visual, ritmo e microinterações que tornem o uso natural e agradável.",
        ctaLabel: "Ver projetos",
        ctaHref: "/work",
    },
    {
        id: "frontend",
        number: "02",
        title: "Desenvolvimento Web Moderno",
        tags: "Next.js / TypeScript / APIs / Web Standards",
        description:
            "Construo projetos explorando o ecossistema moderno de JavaScript e TypeScript, priorizando código claro, boa estrutura e decisões práticas.",
        ctaLabel: "Ver no GitHub",
        ctaHref: "https://github.com/Jhnvida",
    },
    {
        id: "experiments",
        number: "03",
        title: "Ideias & Projetos Autorais",
        tags: "Storytelling / Prototipagem / Criação",
        description:
            "Gosto de transformar curiosidade em código. Tiro ideias da cabeça para testar ferramentas, explorar novas linguagens visuais e aprender na prática.",
        ctaLabel: "Conhecer trajetória",
        ctaHref: "/about",
    },
];

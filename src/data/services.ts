import { ServiceItem } from "../types";

export const SERVICES: ServiceItem[] = [
    {
        id: "full-stack",
        number: "01",
        title: "Desenvolvimento Full-Stack",
        tags: "Next.js / Node.js / Cloud Architecture",
        description:
            "Desenvolvimento ponta-a-ponta de aplicações web escaláveis. Foco em arquitetura robusta, performance extrema e código limpo para produtos que precisam crescer com estabilidade.",
        ctaLabel: "Discutir projeto",
    },
    {
        id: "ui-ux",
        number: "02",
        title: "Engenharia de Interfaces & Motion",
        tags: "React / GSAP / Tailwind CSS",
        description:
            "Criação de front-ends imersivos e premium. Transformo designs em experiências interativas hiperfluidas, com animações a 60fps e acessibilidade de primeira classe.",
        ctaLabel: "Discutir projeto",
    },
    {
        id: "consulting",
        number: "03",
        title: "Consultoria & Refatoração",
        tags: "Code Review / Performance / Escalabilidade",
        description:
            "Auditoria de bases de código existentes, otimização de performance (Web Vitals) e reestruturação arquitetural para destravar o crescimento do seu produto digital.",
        ctaLabel: "Discutir projeto",
    },
];

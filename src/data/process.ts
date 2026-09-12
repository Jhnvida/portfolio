import { ProcessStep } from "../types";

export const PROCESS_STEPS: ProcessStep[] = [
    {
        id: "discovery",
        number: "01",
        title: "Descoberta & Arquitetura",
        description:
            "Entendimento profundo do escopo e mapeamento da arquitetura de dados e UX antes da primeira linha de código.",
    },
    {
        id: "engineering",
        number: "02",
        title: "Engenharia & Performance",
        description:
            "Desenvolvimento full-stack robusto, priorizando código limpo, lógica escalável e altíssima performance estrutural.",
    },
    {
        id: "refinement",
        number: "03",
        title: "Refinamento & Interação",
        description:
            "Polimento visual cirúrgico e implementação de microinterações fluidas com GSAP, unindo estética premium e funcionalidade.",
    },
    {
        id: "deploy",
        number: "04",
        title: "Deploy & Evolução",
        description:
            "Lançamento impecável, otimização contínua de métricas (SEO/Performance) e suporte analítico para garantir escala.",
    },
];

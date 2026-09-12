import { Project } from "../types";

export const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Plataforma Web de Investimentos",
        client: "Projeto Alpha",
        category: "Full-Stack Web App",
        impact: "+40% Conversão",
        image: "https://placehold.co/1200x800/1a1a1a/ffffff?text=Project+Alpha",
        link: "/work/project-alpha",
    },
    {
        id: "2",
        title: "Design System para E-commerce",
        client: "Projeto Beta",
        category: "UI/UX & Design System",
        impact: "Zero Inconsistências",
        image: "https://placehold.co/1200x800/2a2a2a/ffffff?text=Project+Beta",
        link: "/work/project-beta",
    },
    {
        id: "3",
        title: "Arquitetura Serverless para Aplicação Web",
        client: "Projeto Gamma",
        category: "Backend & Cloud",
        impact: "-60% Custos AWS",
        image: "https://placehold.co/1200x800/333333/ffffff?text=Project+Gamma",
        link: "/work/project-gamma",
    },
    {
        id: "4",
        title: "Redesign de Interface para Plataforma SaaS",
        client: "Projeto Delta",
        category: "Product Design",
        impact: "+2x Retenção",
        image: "https://placehold.co/1200x800/444444/ffffff?text=Project+Delta",
        link: "/work/project-delta",
    },
];

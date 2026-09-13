import { Project } from "../types";

export const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Plataforma Web de Investimentos",
        client: "Projeto Alpha",
        category: "Full-Stack Web App",
        impact: "+40% Conversão",
        image: "/images/projects/project-alpha.jpg",
        slug: "project-alpha",
    },
    {
        id: "2",
        title: "Design System para E-commerce",
        client: "Projeto Beta",
        category: "UI/UX & Design System",
        impact: "Zero Inconsistências",
        image: "/images/projects/project-beta.jpg",
        slug: "project-beta",
    },
    {
        id: "3",
        title: "Arquitetura Serverless para Aplicação Web",
        client: "Projeto Gamma",
        category: "Backend & Cloud",
        impact: "-60% Custos AWS",
        image: "/images/projects/project-gamma.jpg",
        slug: "project-gamma",
    },
    {
        id: "4",
        title: "Redesign de Interface para Plataforma SaaS",
        client: "Projeto Delta",
        category: "Product Design",
        impact: "+2x Retenção",
        image: "/images/projects/project-delta.jpg",
        slug: "project-delta",
    },
];

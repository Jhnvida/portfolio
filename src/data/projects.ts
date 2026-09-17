import { Project } from "../types";

export const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Plataforma web de investimentos",
        client: "Projeto Alpha",
        category: "Full-Stack Web App",
        impact: "+40% Conversão",
        image: "/images/project-alpha.jpg",
        slug: "project-alpha",
    },
    {
        id: "2",
        title: "Design system para e-commerce",
        client: "Projeto Beta",
        category: "UI/UX & Design System",
        impact: "Zero Inconsistências",
        image: "/images/project-beta.jpg",
        slug: "project-beta",
    },
    {
        id: "3",
        title: "Arquitetura serverless para aplicação web",
        client: "Projeto Gamma",
        category: "Backend & Cloud",
        impact: "-60% Custos AWS",
        image: "/images/project-gamma.jpg",
        slug: "project-gamma",
    },
    {
        id: "4",
        title: "Redesign de interface para plataforma SaaS",
        client: "Projeto Delta",
        category: "Product Design",
        impact: "+2x Retenção",
        image: "/images/project-delta.jpg",
        slug: "project-delta",
    },
];

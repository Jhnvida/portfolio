export interface ProjectItem {
    slug: string;
    title: string;
    context: string;
    year: string;
    imageSrc?: string;
    aspectRatio: string;
}

export const PROJECTS: ProjectItem[] = [
    {
        slug: "assist-sistemas",
        title: "Sistemas Corporativos & Integração de Serviços",
        context: "Assist Soluções em TI · Produção",
        year: "2024 – 2026",
        imageSrc: "/projects/assist-sistemas.webp",
        aspectRatio: "aspect-[16/10]",
    },
    {
        slug: "fullstack-apps",
        title: "Aplicações Web & Interfaces Interativas",
        context: "React, TypeScript & Node.js",
        year: "2025",
        imageSrc: "/projects/fullstack-apps.webp",
        aspectRatio: "aspect-[16/10]",
    },
    {
        slug: "apis-servicos-backend",
        title: "APIs REST & Serviços Back-End",
        context: "Node.js, Express & SQL",
        year: "2025",
        imageSrc: "/projects/apis-servicos-backend.webp",
        aspectRatio: "aspect-[16/10]",
    },
    {
        slug: "otimizacao-relatorios-sql",
        title: "Otimização de Consultas & Relatórios Internos",
        context: "PHP, MySQL & PostgreSQL",
        year: "2024 – 2025",
        imageSrc: "/projects/otimizacao-relatorios-sql.webp",
        aspectRatio: "aspect-[16/10]",
    },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

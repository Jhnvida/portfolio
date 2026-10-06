import type { Project } from "../../../types/project";

export const ourJourneyProject: Project = {
    id: "2",
    title: "A Nossa Jornada",
    summary: "Uma linha do tempo interativa para guardar e reviver memórias especiais.",
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
};

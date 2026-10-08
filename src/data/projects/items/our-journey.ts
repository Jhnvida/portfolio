import type { Project } from "../../../types/project";

export const ourJourneyProject: Project = {
    id: "2",
    title: "Our Journey",
    summary:
        "Aplicação web de linha do tempo interativa projetada para catalogar e preservar memórias cronológicas de forma acolhedora.",
    category: "Aplicativo Web",
    client: "Pessoal",
    role: "Concepção & Desenvolvimento Full Stack",
    impact: "Linha do Tempo Cronológica & Persistência",
    image: "/images/our-journey.png",
    slug: "our-journey",
    stack: ["React", "TypeScript", "Vite", "Supabase", "Motion"],
    year: "2026",
    featured: true,
    githubUrl: "https://github.com/Jhnvida/our-journey",
    content: [
        {
            type: "media",
            layout: "full",
            items: [
                { src: "/images/our-journey.png", type: "image", alt: "Visão geral da linha do tempo no Our Journey" },
            ],
        },
        {
            type: "editorial",
            title: "Contexto e Proposta",
            paragraphs: [
                "O Our Journey nasceu da necessidade de criar um repositório íntimo e duradouro para registros afetivos. Em contraste com a efemeridade das redes sociais tradicionais — onde lembranças se perdem em feeds acelerados —, a aplicação foi estruturada como um arquivo digital calmo, onde memórias importantes possuem espaço permanente e ritmo próprio de leitura.",
            ],
        },
        {
            type: "editorial",
            title: "Design da Experiência e Linha do Tempo",
            paragraphs: [
                "A interface organiza acontecimentos em uma sequência cronológica vertical, combinando datas, textos narrativos e registros fotográficos. O desenho priorizou espaçamentos generosos, contraste equilibrado e uma tipografia que favorece a imersão em cada relato.",
                "Para guiar o olhar durante a navegação, foram implementadas animações sutis de revelação com a biblioteca Motion, introduzindo marcos temporais suavemente conforme a página é percorrida.",
            ],
        },
        {
            type: "editorial",
            title: "Estrutura Técnica e Persistência",
            paragraphs: [
                "A aplicação foi desenvolvida em React com TypeScript utilizando o Vite como ferramenta de build para garantir rapidez de compilação e bundle leve. O gerenciamento de dados e autenticação fica a cargo do Supabase, permitindo persistência em nuvem e consultas estruturadas de forma segura.",
            ],
            list: [
                "Estrutura cronológica de eventos com renderização condicional de fotos e textos",
                "Backend e banco de dados relacional gerenciados com Supabase",
                "Animações coordenadas de entrada de eventos utilizando a biblioteca Motion",
                "Tipagem estrita em TypeScript cobrindo esquemas de dados de ponta a ponta",
            ],
        },
    ],
};

import type { Project } from "../../../types/project";

export const portfolioProject: Project = {
    id: "1",
    title: "Portfólio Pessoal",
    summary:
        "Plataforma autoral desenvolvida para explorar tipografia fluida, microinterações refinadas e navegação lateral sem frameworks de componentes prontos.",
    category: "Portfólio",
    client: "Pessoal",
    role: "Design de Interface & Desenvolvimento Front-End",
    impact: "Sistemas de Design & Microinterações",
    image: "/images/portfolio.png",
    slug: "portfolio",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lenis"],
    year: "2026",
    featured: true,
    githubUrl: "https://github.com/Jhnvida/portfolio",
    content: [
        {
            type: "media",
            layout: "full",
            items: [
                { src: "/images/portfolio.png", type: "image", alt: "Visão geral da interface do Portfólio Pessoal" },
            ],
        },
        {
            type: "editorial",
            title: "Contexto e Propósito",
            paragraphs: [
                "Este site foi concebido como um espaço autoral de experimentação e consolidação técnica. Em vez de recorrer a bibliotecas de componentes pré-fabricadas ou templates convencionais, a proposta foi desenhar e programar cada interação do zero, exercitando o controle direto sobre o DOM, a tipografia e o CSS moderno.",
                "O objetivo central foi alcançar uma estética editorial limpa e silenciosa, onde a hierarquia visual e a sutileza dos movimentos transmitam maturidade técnica sem recorrer a excessos visuais ou artifícios decorativos desnecessários.",
            ],
        },
        {
            type: "editorial",
            title: "Arquitetura de Navegação e Grid",
            paragraphs: [
                "A estrutura visual é regida por um sistema de grid compartilhado de 12 colunas, delimitado por guias tracejadas sutis que organizam a densidade de conteúdo em diferentes larguras de tela. Essa grade serve como base consistente tanto para a página principal quanto para o detalhamento dos projetos.",
                "Para a visualização dos trabalhos, foi desenvolvido um sistema de painel lateral ancorado à direita que preserva a home visível ao fundo, acompanhado de um preview fotográfico em alta resolução na área livre da tela. A rolagem é gerenciada de forma desacoplada com o Lenis, mantendo a posição de leitura intacta ao fechar.",
            ],
        },
        {
            type: "editorial",
            title: "Decisões Técnicas",
            paragraphs: [
                "Construído sobre o Next.js com App Router e Tailwind CSS v4, o projeto prioriza renderização estática instantânea, zero dependências supérfluas e conformidade estrita com padrões de acessibilidade web.",
            ],
            list: [
                "Tipografia fluida calculada com clamp() para proporções harmoniosas entre mobile e desktop",
                "Suporte nativo e automático a preferências de movimento reduzido (prefers-reduced-motion)",
                "Gerenciamento de tema claro/escuro com script inline anti-flicker e persistência local",
                "Transições de preview com arquitetura de duas camadas e pré-carregamento em memória",
            ],
        },
    ],
};

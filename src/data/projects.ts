interface ProjectSections {
    overview: string;
    solutions: string;
    results: string;
}

export interface ProjectItem {
    slug: string;
    title: string;
    context: string;
    year: string;
    summary: string;
    imageSrc?: string;
    aspectRatio: string;
    githubUrl?: string;
    liveUrl?: string;
    sections: ProjectSections;
}

export const PROJECTS: ProjectItem[] = [
    {
        slug: "portfolio",
        title: "Portfólio Pessoal",
        context: "Site Minimalista",
        year: "2026",
        summary:
            "Site autoral desenvolvido com estética editorial minimalista, tipografia cuidadosa e microinterações fluidas, priorizando o protagonismo do trabalho e o rigor técnico em acessibilidade.",
        imageSrc: "/projects/portfolio.png",
        aspectRatio: "aspect-[16/10]",
        githubUrl: "https://github.com/Jhnvida/portfolio",
        liveUrl: "https://jhnvida.dev",
        sections: {
            overview:
                "Criado com a intenção de romper com modelos pré-moldados e a estética padronizada de interfaces geradas por IA, este portfólio aposta em um design editorial autoral, proporções equilibradas e tipografia expressiva. O objetivo foi criar uma presença digital sofisticada que comunique com clareza minha atuação técnica, filosofia de trabalho e projetos selecionados.",
            solutions:
                "Unimos o scroll físico suave da biblioteca Lenis com as micro-interações orquestradas no GSAP e uma galeria com carregamento escalonado de projetos. Desenvolvemos também um cursor magnético contextual que reage aos elementos interativos, e estruturamos o site com rotas dinâmicas pré-renderizadas no Next.js 16 para carregamento instantâneo.",
            results:
                "Uma plataforma rápida, acessível e coesa, com suporte integral a preferências de redução de movimento (prefers-reduced-motion) sem comprometer a identidade visual. O projeto reflete minha evolução técnica em TypeScript, React 19 e Tailwind CSS v4, com código-fonte público no GitHub e arquitetura modular pronta para receber novos trabalhos.",
        },
    },
    {
        slug: "our-journey",
        title: "A Nossa Jornada",
        context: "Aplicação Web Interativa",
        year: "2026",
        summary:
            "Aplicação web criada para casais acompanharem sua história e reunirem momentos especiais, memórias, receitas e planos futuros em um espaço íntimo e seguro.",
        imageSrc: "/projects/our-journey.png",
        aspectRatio: "aspect-[16/10]",
        githubUrl: "https://github.com/Jhnvida/our-journey",
        liveUrl: "https://our-journey-jhnvida.vercel.app",
        sections: {
            overview:
                "Registros de datas marcantes e momentos especiais de um relacionamento costumam ficar dispersos em conversas de chat, rolos de câmera ou galerias de redes sociais. O 'A Nossa Jornada' foi criado com o propósito de reunir essas lembranças em um espaço digital acolhedor, privado e intimista, permitindo que o casal acompanhe sua trajetória em uma linha do tempo cronológica com fotos, datas e relatos afetivos.",
            solutions:
                "Construímos uma interface interativa rica que reúne um contador em tempo real calculando a duração exata do relacionamento em anos, meses e dias, um mural de 'Próximos Capítulos' para planejar e marcar metas futuras a dois, e a seção 'A Nossa Cozinha', criada para arquivar receitas culinárias compartilhadas. Toda a gestão de conteúdo é feita por um painel administrativo protegido com autenticação e banco de dados do Supabase.",
            results:
                "A aplicação alcançou uma experiência de navegação leve e fluida, combinando o novo React Compiler no React 19 para renderização otimizada, transições suaves com Motion e estilos modulares com CSS Modules. O projeto está concluído e com código-fonte aberto no GitHub, servindo como uma demonstração prática de engenharia de interface moderna e sensibilidade visual.",
        },
    },
    {
        slug: "inventario",
        title: "Inventário Inteligente",
        context: "Gestão Operacional & IA Local",
        year: "2026",
        summary:
            "Sistema de gestão de estoque e rastreabilidade operacional que une integridade transacional no PostgreSQL via Supabase a um assistente analítico executado localmente via Ollama com Function Calling.",
        imageSrc: "/projects/inventario.png",
        aspectRatio: "aspect-[16/10]",
        githubUrl: "https://github.com/Jhnvida/inventario-tcc",
        sections: {
            overview:
                "O controle de inventário físico em empresas costuma sofrer com dois gargalos críticos: divergências de saldo decorrentes de concorrência operacional e a dificuldade de extrair inteligência ágil a partir de milhares de movimentações diárias. O Inventário Inteligente foi desenvolvido para resolver essa lacuna, unificando catalogação detalhada (SKU, localização física, limites de segurança), auditoria rigorosa de entradas e saídas e fluxos transacionais completos de pedidos de compra e venda em uma plataforma web de alta velocidade.",
            solutions:
                "Para garantir blindagem contra inconsistências de estoque, todas as operações de movimentação e baixa de pedidos foram modeladas diretamente no PostgreSQL do Supabase por meio de Stored Procedures (RPCs) com transações atômicas ACID. O grande diferencial está na integração de um assistente de IA conversacional executado 100% localmente via Ollama (modelo Llama 3.2), equipado com Function Calling determinístico e guardrails de escopo: o operador pode consultar métricas, análises de curva ABC e previsões de ruptura de estoque em linguagem natural, com segurança de dados garantida e sem dependência de APIs em nuvem.",
            results:
                "Uma solução corporativa robusta e moderna construída com React 19 (aproveitando o React Compiler para eliminar re-renderizações supérfluas), TypeScript rigoroso, Vite 8 e Tailwind CSS v4. A interface conta com painel de controle executivo em tempo real, navegação fluida orquestrada por GSAP e rotas protegidas por autenticação segura. O projeto conta com testes automatizados nativos do Node.js, conformidade estrita de linting com Oxlint e código-fonte público no GitHub.",
        },
    },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

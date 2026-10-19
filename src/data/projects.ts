export interface ProjectSections {
    overview: string;
    solutions: string;
    results: string;
}

export interface ProjectItem {
    slug: string;
    title: string;
    context: string;
    year: string;
    status?: "Em desenvolvimento" | "Concluído";
    summary: string;
    imageSrc?: string;
    aspectRatio: string;
    githubUrl?: string;
    sections: ProjectSections;
}

export const PROJECTS: ProjectItem[] = [
    {
        slug: "portfolio",
        title: "Portfólio Pessoal",
        context: "Website Minimalista",
        year: "2026",
        status: "Concluído",
        summary:
            "Website autoral desenvolvido com estética editorial minimalista, tipografia cuidadosa e micro-interações fluidas, priorizando o protagonismo do trabalho e o rigor técnico em acessibilidade.",
        imageSrc: "/projects/portfolio.png",
        aspectRatio: "aspect-[16/10]",
        githubUrl: "https://github.com/Jhnvida/portfolio",
        sections: {
            overview:
                "Criado com a intenção de romper com templates pré-moldados e a estética padronizada de interfaces geradas por IA, este portfólio aposta em um design editorial autoral, proporções equilibradas e tipografia expressiva. O objetivo foi criar uma presença digital sofisticada que comunique com clareza minha atuação técnica, filosofia de trabalho e projetos selecionados.",
            solutions:
                "Unimos o scroll físico suave da biblioteca Lenis com as animações orquestradas do GSAP ScrollTrigger, criando uma transição de scrub parallax no hero e uma galeria com carregamento escalonado de projetos. Desenvolvemos também um cursor magnético contextual que reage aos elementos interativos, e estruturamos o site com rotas dinâmicas pré-renderizadas no Next.js 16 para carregamento instantâneo.",
            results:
                "Uma plataforma rápida, acessível e coesa, com suporte integral a preferências de redução de movimento (prefers-reduced-motion) sem comprometer a identidade visual. O projeto reflete minha evolução técnica em TypeScript, React 19 e Tailwind CSS v4, com código-fonte público no GitHub e arquitetura modular pronta para receber novos trabalhos.",
        },
    },
    {
        slug: "our-journey",
        title: "A Nossa Jornada",
        context: "Aplicação Web Interativa",
        year: "2026",
        status: "Concluído",
        summary:
            "Aplicação web criada para casais acompanharem sua história e reunirem momentos especiais, memórias, receitas e planos futuros em um espaço íntimo e seguro.",
        imageSrc: "/projects/our-journey.png",
        aspectRatio: "aspect-[16/10]",
        githubUrl: "https://github.com/Jhnvida/our-journey",
        sections: {
            overview:
                "Registros de datas marcantes e momentos especiais de um relacionamento costumam ficar dispersos em conversas de chat, rolos de câmera ou galerias de redes sociais. O Our Journey foi criado com o propósito de reunir essas lembranças em um espaço digital acolhedor, privado e intimista, permitindo que o casal acompanhe sua trajetória em uma linha do tempo cronológica com fotos, datas e relatos afetivos.",
            solutions:
                "Construímos uma interface interativa rica que reúne um contador em tempo real calculando a duração exata do relacionamento em anos, meses e dias, um mural de 'Próximos Capítulos' para planejar e marcar metas futuras a dois, e a seção 'A Nossa Cozinha', criada para arquivar receitas culinárias compartilhadas. Toda a gestão de conteúdo é feita por um painel administrativo protegido com autenticação e banco de dados do Supabase.",
            results:
                "A aplicação alcançou uma experiência de navegação leve e fluida, combinando o novo React Compiler no React 19 para renderização otimizada, transições suaves com Motion e estilos modulares com CSS Modules. O projeto está concluído e com código-fonte aberto no GitHub, servindo como uma demonstração prática de engenharia front-end moderna e sensibilidade de design.",
        },
    },
    {
        slug: "vitrine",
        title: "Vitrine",
        context: "Micro-SaaS & E-commerce",
        year: "2026",
        status: "Em desenvolvimento",
        summary:
            "Plataforma micro-SaaS voltada para pequenos lojistas que vendem pelo Instagram e fecham pedidos pelo WhatsApp. O projeto centraliza o catálogo em um link leve para a bio, permitindo a seleção de produtos e o encaminhamento do pedido formatado diretamente no aplicativo de mensagens.",
        imageSrc: "/projects/vitrine.png",
        aspectRatio: "aspect-[16/10]",
        sections: {
            overview:
                "Muitos pequenos empreendedores utilizam o Instagram como vitrine principal, mas enfrentam grande atrito na etapa de fechar pedidos: o envio manual de dezenas de fotos ou catálogos pesados em PDF no WhatsApp gera conversas confusas, demora no atendimento e perda frequente de vendas. O Vitrine foi concebido para resolver esse gargalo, oferecendo uma plataforma ágil onde cada lojista tem um link único e leve para a bio, com catálogo online otimizado para celulares.",
            solutions:
                "Desenvolvemos uma experiência de compra prática em que o cliente navega pelos produtos, escolhe variações, adiciona itens ao carrinho e encaminha o pedido pronto e formatado diretamente para a conversa com o vendedor no WhatsApp. Para o lojista, a plataforma conta com um painel administrativo com upload e compressão automática de fotos no navegador antes do envio, métricas de visitas e conversão, além de integração com Stripe para faturamento recorrente com período de testes e tolerância bancária.",
            results:
                "O projeto encontra-se atualmente em fase de desenvolvimento e estruturação contínua. As principais fundações técnicas - arquitetura moderna no Next.js 16 com Server Actions, segurança e isolamento multi-inquilino via Supabase Row Level Security (RLS) e suíte de testes com Vitest - já foram consolidadas, preparando o sistema para testes e validação com os primeiros lojistas.",
        },
    },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

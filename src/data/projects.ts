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
        slug: "vitrine",
        title: "Vitrine",
        context: "Plataforma Digital & Criadores",
        year: "2026",
        summary:
            "Plataforma de loja para bio voltada para criadores de conteúdo e produtores digitais monetizarem sua audiência. Transforma o link da bio em uma loja digital enxuta inspirada em blocos modulares, com pagamento nativo em segundos via Pix e Cartão e entrega automatizada de arquivos digitais.",
        imageSrc: "/projects/vitrine.png",
        aspectRatio: "aspect-[16/10]",
        sections: {
            overview:
                "Criadores de conteúdo, mentores e profissionais independentes costumam concentrar sua distribuição no Instagram, mas enfrentavam atrito severo para converter seguidores em compradores. O mercado dividia-se entre agregadores de links estáticos, que apenas dispersam o tráfego sem capacidade transacional, e plataformas tradicionais de infoprodutos, cujas etapas burocráticas de pagamento destroem a conversão de compras por impulso (como modelos prontos, livros digitais e planilhas). O Vitrine foi concebido para ocupar esse espaço ideal: transformar o link da bio em uma loja ágil de estética refinada, permitindo que a compra seja concluída em menos de 30 segundos no próprio navegador do aplicativo.",
            solutions:
                "Projetamos uma interface modular pensada prioritariamente para celular e orientada por blocos visuais claros, garantindo elegância e hierarquia intuitiva para os produtos e links do criador. Eliminamos redirecionamentos externos integrando um painel de pagamento nativo acoplado ao Stripe para liquidação instantânea via Pix dinâmico e cartão de crédito. Implementamos uma esteira de entrega digital automatizada com fornecimento de links de download seguros e temporários em armazenamento em nuvem e confirmações transacionais disparadas por e-mail, além de um painel de controle protegido com autenticação segura e monitoramento de saldos e conversões.",
            results:
                "Uma infraestrutura moderna e escalável construída com Next.js 16, TypeScript e Tailwind CSS. A persistência e as regras de negócio são resguardadas por políticas estritas de segurança de dados no banco de dados e rotas protegidas, cobertas por uma suíte de testes de integração automatizados. Com as etapas de base, modelagem e integração em nuvem validadas, o projeto encontra-se pronto para a fase de testes com criadores fundadores.",
        },
    },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

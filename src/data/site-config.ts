export interface SocialLinks {
    github: string;
    linkedin: string;
}

export interface SiteConfig {
    name: string;
    shortName: string;
    role: string;
    description: string;
    headline: string;
    location: string;
    email: string;
    emailDisplay: string;
    social: SocialLinks;
    bio: readonly string[];
}

export const SITE_CONFIG: SiteConfig = {
    name: "João André Vida da Silva",
    shortName: "João André",
    role: "Desenvolvedor de Software",
    description:
        "Desenvolvedor de software focado em sites e aplicações web. Criação de interfaces funcionais, sistemas sob medida e atenção à estabilidade técnica.",
    headline:
        "Sou desenvolvedor de software focado em interfaces funcionais, precisão visual e estabilidade de sistemas em produção.",
    location: "Jaguariúna e Campinas, SP",
    email: "joao.vida.andre@gmail.com",
    emailDisplay: "joao.vida.andre (at) gmail.com",
    social: {
        github: "https://github.com/Jhnvida",
        linkedin: "https://www.linkedin.com/in/jaoandre",
    },
    bio: [
        "Construo sites e aplicações web combinando cuidado estético, facilidade de uso e código bem organizado. Meu foco é entender os requisitos reais de cada projeto para entregar produtos objetivos e confortáveis de usar, desde páginas institucionais com acabamento editorial até ferramentas sob medida para simplificar processos.",
        "Com cerca de dois anos de experiência prática na criação e sustentação de sistemas em produção, trabalho com atenção constante à estabilidade, resolução de falhas e evolução técnica contínua. Acredito que uma boa aplicação precisa equilibrar uma interface agradável com uma base de código previsível e manutenível a longo prazo.",
        "Na rotina com clientes e times de desenvolvimento, prezo pela transparência: comunicação direta, alinhamento honesto de expectativas, cumprimento de prazos acordados e cuidado com a qualidade final de cada entrega. Atuo de forma remota ou presencial na região de Jaguariúna e Campinas, SP.",
    ],
} as const;

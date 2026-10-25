export interface SocialLinks {
    github: string;
    linkedin: string;
}

export interface SiteConfig {
    name: string;
    shortName: string;
    role: string;
    description: string;
    location: string;
    email: string;
    emailDisplay: string;
    social: SocialLinks;
}

export const SITE_CONFIG: SiteConfig = {
    name: "João André Vida da Silva",
    shortName: "João André",
    role: "Desenvolvedor de Software",
    description:
        "Desenvolvedor de software focado em sites e aplicações web. Criação de interfaces funcionais, sistemas sob medida e atenção à estabilidade técnica.",
    location: "Jaguariúna e Campinas, SP",
    email: "joao.vida.andre@gmail.com",
    emailDisplay: "joao.vida.andre (at) gmail.com",
    social: {
        github: "https://github.com/Jhnvida",
        linkedin: "https://www.linkedin.com/in/jaoandre",
    },
} as const;

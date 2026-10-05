export const SITE = {
    name: "João Vida",
    role: "Desenvolvedor Full Stack",
    email: "joao.vida.andre@gmail.com",
    location: {
        city: "Jaguariúna",
        region: "SP",
        country: "Brasil",
        timeZone: "America/Sao_Paulo",
        timeZoneLabel: "BRT (UTC−3)",
    },
} as const;

export const NAV_LINKS = [
    { label: "Início", href: "/" },
    { label: "Projetos", href: "/work" },
    { label: "Sobre", href: "/about" },
] as const;

export const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/Jhnvida" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jaoandre/" },
    { label: "E-mail", href: `mailto:${SITE.email}` },
] as const;

export const CONTACT_ANCHOR = "contato";

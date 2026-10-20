export interface ProfessionalExperience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export const PROFESSIONAL_EXPERIENCES: readonly ProfessionalExperience[] = [
    {
        company: "Clínica Dr. André Azevedo",
        role: "Analista de Suporte Técnico e Implantação",
        period: "2026 - Presente",
        description:
            "Atuação na implantação, parametrização e sustentação de sistemas, suporte técnico aos fluxos operacionais e clínicos, treinamento de usuários e garantia de estabilidade dos serviços de tecnologia.",
    },
    {
        company: "Assist Soluções em TI",
        role: "Desenvolvedor de Software Júnior",
        period: "2024 - 2026",
        description:
            "Desenvolvimento e sustentação de funcionalidades para sistemas web em produção com PHP, JavaScript e HTML5. Implementação e integração de APIs REST para comunicação entre módulos, além de otimização de rotinas e consultas em bancos relacionais SQL com foco em desempenho e estabilidade operacional.",
    },
    {
        company: "Assist Soluções em TI",
        role: "Estagiário de Desenvolvimento",
        period: "2024",
        description:
            "Manutenção corretiva e evolutiva de sistemas web em produção, resolução de falhas em interfaces e suporte na otimização de procedures SQL, reduzindo tempos de resposta na geração de relatórios internos.",
    },
] as const;

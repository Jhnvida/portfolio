import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Sobre",
    description: "Trajetória e histórico profissional de João André — Desenvolvedor de Software.",
};

interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    monogram: string;
}

interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    period: string;
    monogram: string;
}

const experiences: ExperienceItem[] = [
    {
        id: "assist-junior",
        company: "Assist Soluções em TI",
        role: "Desenvolvedor de Software Júnior",
        period: "2024 — 2026",
        description:
            "Desenvolvimento e sustentação de funcionalidades para sistemas web em produção com PHP, JavaScript e HTML5. Implementação e integração de APIs REST para comunicação estruturada entre módulos, além de otimização de consultas em bancos relacionais SQL com foco em desempenho e estabilidade de rotinas críticas.",
        monogram: "AS",
    },
    {
        id: "assist-intern",
        company: "Assist Soluções em TI",
        role: "Estagiário de Desenvolvimento",
        period: "2024",
        description:
            "Manutenção corretiva e evolutiva de sistemas web em produção, identificação e correção de bugs em interfaces e otimização de procedures SQL, reduzindo tempos de resposta na geração de relatórios internos.",
        monogram: "AS",
    },
];

const educationList: EducationItem[] = [
    {
        id: "unifaj",
        institution: "Centro Universitário de Jaguariúna (UniFAJ)",
        degree: "Bacharelado em Ciência da Computação",
        period: "2022 — 2026",
        monogram: "UF",
    },
    {
        id: "etec",
        institution: "ETEC Pedro Ferreira Alves",
        degree: "Técnico em Informática para Internet",
        period: "2020 — 2022",
        monogram: "ET",
    },
];

export default function AboutPage() {
    return (
        <div className="px-6 pt-16 pb-24 md:pt-24 md:pb-32">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-5">
                        <div className="overflow-hidden rounded-2xl bg-neutral-100 max-w-xs mx-auto lg:mx-0">
                            <div className="relative aspect-[3/4] w-full">
                                <Image
                                    src="https://placehold.co/400x520/e5e7eb/1f2937?text=Foto+Perfil"
                                    alt="Retrato profissional de João André"
                                    fill
                                    sizes="(max-width: 768px) 320px, 400px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-4 text-base leading-relaxed text-neutral-600 font-sans">
                            <p>
                                Atuo como desenvolvedor de software com quase 2 anos de experiência profissional em
                                engenharia, sustentação e evolução de aplicações web em produção.
                            </p>
                            <p>
                                Minha prática concentra-se no desenvolvimento e na integração de APIs REST, rotinas de
                                otimização de consultas em bancos de dados relacionais (MySQL e PostgreSQL) e
                                colaboração ativa em fluxos ágeis com versionamento e code review em Git.
                            </p>
                            <p>
                                Atualmente, foco minha especialização técnica no ecossistema TypeScript, React e
                                Node.js, priorizando tipagem estática, previsibilidade e manutenibilidade de código.
                            </p>
                        </div>

                        <div className="pt-4">
                            <h2 className="text-xs font-medium text-neutral-400 font-sans mb-6">Experience</h2>

                            <div className="space-y-6">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="space-y-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 font-heading text-[10px] font-semibold text-neutral-800">
                                                    {exp.monogram}
                                                </div>
                                                <div>
                                                    <div className="font-heading text-sm font-medium text-neutral-950">
                                                        {exp.company}
                                                    </div>
                                                    <div className="text-xs text-neutral-500 font-sans">{exp.role}</div>
                                                </div>
                                            </div>

                                            <span className="font-mono text-xs text-neutral-400 shrink-0">
                                                {exp.period}
                                            </span>
                                        </div>

                                        <p className="pl-10 text-xs sm:text-sm leading-relaxed text-neutral-600 font-sans">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <h2 className="text-xs font-medium text-neutral-400 font-sans mb-6">Education</h2>

                            <div className="space-y-6">
                                {educationList.map((edu) => (
                                    <div key={edu.id} className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 font-heading text-[10px] font-semibold text-neutral-800">
                                                {edu.monogram}
                                            </div>
                                            <div>
                                                <div className="font-heading text-sm font-medium text-neutral-950">
                                                    {edu.institution}
                                                </div>
                                                <div className="text-xs text-neutral-500 font-sans">{edu.degree}</div>
                                            </div>
                                        </div>

                                        <span className="font-mono text-xs text-neutral-400 shrink-0">
                                            {edu.period}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

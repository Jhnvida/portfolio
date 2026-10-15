import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PersonalIntro() {
    return (
        <section
            aria-label="Apresentação pessoal e especialidades"
            className="mx-auto max-w-355 px-6 md:px-10 py-24 md:py-36 border-t border-neutral-100"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 lg:gap-x-20">
                <div className="md:col-span-7 lg:col-span-7">
                    <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-6">Sobre</p>
                    <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-neutral-800 max-w-xl">
                        <p>
                            Desenvolvedor de software com experiência na criação e sustentação de aplicações web em
                            produção, atuando na integração de APIs REST e na otimização de rotinas e consultas em
                            bancos relacionais.
                        </p>
                        <p>
                            Graduando em Ciência da Computação pela UniFAJ, concentro minha atuação prática no
                            ecossistema TypeScript, React, Node.js e PHP, priorizando código limpo, estabilidade e
                            arquitetura sustentável.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-1.5 text-xs font-sans text-neutral-500 transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:underline"
                        >
                            <span>Trajetória profissional completa</span>
                            <ArrowRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </div>

                <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                            Especialidades
                        </p>
                        <ul className="space-y-2.5 font-sans text-sm text-neutral-800">
                            <li>Desenvolvimento Front-End (React, TypeScript)</li>
                            <li>APIs RESTful & Back-End (Node.js, PHP)</li>
                            <li>Bancos de Dados Relacionais & SQL (MySQL, PostgreSQL)</li>
                        </ul>
                    </div>

                    <div className="mt-10 md:mt-12">
                        <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                            Disponibilidade
                        </p>
                        <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                            Disponível para novas oportunidades profissionais. Jaguariúna, SP — Presencial, híbrido ou
                            remoto.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

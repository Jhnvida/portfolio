import { PROFESSIONAL_EXPERIENCES, SITE_CONFIG } from "@/data";

export function PersonalIntro() {
    return (
        <section
            id="sobre"
            aria-label={`Sobre ${SITE_CONFIG.shortName} e trajetória profissional`}
            className="relative z-35 w-full bg-[#fafafa] px-6 md:px-10 lg:px-12 xl:px-16 py-24 sm:py-32 md:py-40 scroll-mt-20"
        >
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 xl:gap-x-16">
                <div className="lg:col-span-5 xl:col-span-4 text-left">
                    <p className="font-sans text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-3 sm:mb-4">
                        Sobre mim
                    </p>
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.18] sm:leading-[1.15] tracking-tight text-neutral-950">
                        {SITE_CONFIG.headline}
                    </h2>
                </div>

                <div className="lg:col-span-7 xl:col-span-8 lg:pt-2">
                    <div className="space-y-6 font-sans text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl text-left">
                        {SITE_CONFIG.bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-24 sm:mt-32 pt-16 sm:pt-24 border-t border-neutral-200/70">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 xl:gap-x-16">
                    <div className="lg:col-span-5 xl:col-span-4 text-left">
                        <p className="font-sans text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-3 sm:mb-4">
                            Trajetória
                        </p>
                        <h3 className="font-heading text-2xl sm:text-3xl font-normal text-neutral-950 tracking-tight">
                            Experiência profissional
                        </h3>
                    </div>

                    <div className="lg:col-span-7 xl:col-span-8">
                        <ol className="relative border-l border-neutral-200/80 ml-2 space-y-12 sm:space-y-14">
                            {PROFESSIONAL_EXPERIENCES.map((item, index) => (
                                <li key={index} className="relative pl-6 sm:pl-8 text-left">
                                    <span
                                        className="absolute left-0 -translate-x-1/2 top-2 h-2.5 w-2.5 rounded-full bg-neutral-950 ring-4 ring-[#fafafa]"
                                        aria-hidden="true"
                                    />

                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h4 className="font-sans text-base sm:text-lg font-semibold text-neutral-950">
                                            {item.company}
                                        </h4>
                                        <span className="font-sans text-xs sm:text-sm text-neutral-500 shrink-0 tabular-nums">
                                            {item.period}
                                        </span>
                                    </div>

                                    <p className="font-sans text-sm font-medium text-neutral-800 mt-1">{item.role}</p>

                                    <p className="font-sans text-sm sm:text-[15px] text-neutral-600 leading-relaxed mt-2.5 max-w-2xl">
                                        {item.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

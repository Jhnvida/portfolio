import { PROFESSIONAL_EXPERIENCES, SITE_CONFIG } from "@/data";

export function PersonalIntro() {
    return (
        <section
            id="sobre"
            aria-label={`Sobre ${SITE_CONFIG.shortName} e trajetória profissional`}
            className="mx-auto max-w-355 px-6 md:px-10 py-24 md:py-36 border-t border-neutral-200/80 scroll-mt-24 md:scroll-mt-32"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 xl:gap-x-16">
                <div className="lg:col-span-5 xl:col-span-5">
                    <p className="font-sans text-xs font-medium text-neutral-600 mb-3 sm:mb-4">Sobre mim</p>
                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.22] sm:leading-[1.18] tracking-tight text-neutral-950">
                        {SITE_CONFIG.headline}
                    </h2>
                </div>

                <div className="lg:col-span-7 xl:col-span-7 lg:pt-8 xl:pt-9">
                    <div className="space-y-5 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed sm:leading-[1.75] max-w-2xl">
                        {SITE_CONFIG.bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-20 md:mt-28 pt-16 md:pt-20 border-t border-neutral-200/80">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 xl:gap-x-16">
                    <div className="lg:col-span-5 xl:col-span-5">
                        <p className="font-sans text-xs font-medium text-neutral-600 mb-3 sm:mb-4">Trajetória</p>
                        <h3 className="font-heading text-xl sm:text-2xl font-normal text-neutral-950 tracking-tight">
                            Experiência profissional
                        </h3>
                    </div>

                    <div className="lg:col-span-7 xl:col-span-7">
                        <ol className="relative border-l border-neutral-200/80 ml-2 space-y-10 sm:space-y-12">
                            {PROFESSIONAL_EXPERIENCES.map((item, index) => (
                                <li key={index} className="relative pl-6 sm:pl-8">
                                    <span
                                        className="absolute left-0 -translate-x-1/2 top-2 h-2 w-2 rounded-full bg-neutral-950 ring-4 ring-white"
                                        aria-hidden="true"
                                    />

                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h4 className="font-sans text-sm sm:text-base font-semibold text-neutral-950">
                                            {item.company}
                                        </h4>
                                        <span className="font-sans text-xs sm:text-sm text-neutral-500 shrink-0 tabular-nums">
                                            {item.period}
                                        </span>
                                    </div>

                                    <p className="font-sans text-xs sm:text-sm font-medium text-neutral-800 mt-0.5">
                                        {item.role}
                                    </p>

                                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2 max-w-2xl">
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

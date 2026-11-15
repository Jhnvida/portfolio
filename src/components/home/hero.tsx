import React from "react";

const HEADING_WORDS = ["Transformando", "ideias", "em", "produtos", "digitais", "bem", "construídos."];

export function Hero() {
    return (
        <section
            id="inicio"
            aria-label="Introdução do portfólio"
            className="w-full min-h-[70vh] sm:min-h-[76vh] md:min-h-[82vh] flex flex-col justify-center pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32"
        >
            <div className="max-w-360 mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16">
                <div className="w-full max-w-4xl lg:max-w-5xl text-left space-y-6 sm:space-y-8">
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-950 leading-[1.12] sm:leading-[1.1] text-balance">
                        {HEADING_WORDS.map((word, i) => (
                            <React.Fragment key={i}>
                                <span
                                    className="inline-block animate-hero-word will-change-[transform,opacity]"
                                    style={{
                                        animationDelay: `${120 + i * 38}ms`,
                                    }}
                                >
                                    {word}
                                </span>
                                {i < HEADING_WORDS.length - 1 ? " " : ""}
                            </React.Fragment>
                        ))}
                    </h1>

                    <p
                        className="font-sans text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl text-pretty animate-hero-content will-change-[transform,opacity]"
                        style={{
                            animationDelay: "680ms",
                        }}
                    >
                        Unindo engenharia de software, pensamento de produto e design para criar experiências digitais
                        funcionais, consistentes e duradouras.
                    </p>
                </div>
            </div>
        </section>
    );
}

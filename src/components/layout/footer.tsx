export function Footer() {
    return (
        <footer className="w-full px-6 pb-12 pt-8 sm:pb-16 sm:pt-12">
            <div className="mx-auto max-w-4xl rounded-3xl bg-[#F9F9F9] p-12 sm:p-16 md:p-20 text-center">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-950">
                    Let’s work together
                </h2>

                <div className="mt-3">
                    <a
                        href="mailto:joao.vida.andre@gmail.com"
                        className="text-base sm:text-lg font-sans text-neutral-400 transition-colors hover:text-neutral-900"
                    >
                        joao.vida.andre@gmail.com
                    </a>
                </div>

                <div className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-sans text-neutral-400">
                    <a
                        href="https://www.linkedin.com/in/jaoandre"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-neutral-900"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/Jhnvida"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-neutral-900"
                    >
                        GitHub
                    </a>

                    <a
                        href="/curriculo.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-neutral-900"
                    >
                        Currículo (PDF)
                    </a>

                    <a href="mailto:joao.vida.andre@gmail.com" className="transition-colors hover:text-neutral-900">
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}

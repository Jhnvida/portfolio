import { CaseBlock } from "../../types";

interface CaseEditorialBlockProps {
    block: Extract<CaseBlock, { type: "editorial" }>;
}

export function CaseEditorialBlock({ block }: CaseEditorialBlockProps) {
    return (
        <section className="w-full bg-background relative py-16 md:py-24">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-4">
                        {block.title && (
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                                {block.title}
                            </h2>
                        )}
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {block.paragraphs.map((paragraph, idx) => (
                            <p
                                key={idx}
                                className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl font-light"
                            >
                                {paragraph}
                            </p>
                        ))}

                        {block.list && block.list.length > 0 && (
                            <ul className="mt-8 flex flex-col gap-4">
                                {block.list.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-4 text-lg md:text-xl text-neutral-400"
                                    >
                                        <span className="text-white/20 mt-1.5 font-mono text-sm">0{idx + 1}</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

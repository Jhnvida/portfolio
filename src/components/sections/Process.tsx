import { PROCESS_STEPS } from "../../data/process";

export function Process() {
    return (
        <section id="process" className="w-full py-16 md:py-24 border-b border-neutral-800/60">
            <div className="w-full px-6 md:px-8 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Processo Criativo
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100">
                        Como eu crio
                    </h2>
                    <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
                        Um fluxo transparente e iterativo que conecta imaginação inicial, prototipagem rápida e refino visual contínuo.
                    </p>
                </div>

                <div className="flex flex-col border-t border-neutral-800/60 divide-y divide-neutral-800/60">
                    {PROCESS_STEPS.map((step) => (
                        <div
                            key={step.id}
                            className="py-6 md:py-7 flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8 group transition-colors hover:bg-neutral-900/10 px-2 -mx-2 rounded-none"
                        >
                            <div className="md:w-5/12 shrink-0">
                                <h3 className="text-base md:text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">
                                    {step.title}
                                </h3>
                            </div>

                            <div className="md:w-7/12">
                                <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import Image from "next/image";
import { CaseBlock } from "../../types";
import { LayoutGrid } from "../layout/LayoutGrid";
import { CaseImageReveal } from "./CaseImageReveal";

interface CaseMediaBlockProps {
    block: Extract<CaseBlock, { type: "media" }>;
}

export function CaseMediaBlock({ block }: CaseMediaBlockProps) {
    const { layout, items } = block;

    if (layout === "full") {
        const item = items[0];
        return (
            <section className="w-full py-10 sm:py-16">
                <LayoutGrid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                        <CaseImageReveal className="relative aspect-21/10 w-full overflow-hidden rounded-media">
                            <Image
                                src={item.src}
                                alt={item.alt || "Registro visual do projeto"}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 1200px"
                                className="object-contain"
                            />
                        </CaseImageReveal>
                    </div>
                </LayoutGrid>
            </section>
        );
    }

    if (layout === "grid-2") {
        return (
            <section className="w-full py-10 sm:py-16">
                <LayoutGrid>
                    {items.map((item, idx) => (
                        <div key={idx} className="col-span-4 sm:col-span-4 lg:col-span-6 mb-6 sm:mb-0">
                            <CaseImageReveal className="relative aspect-4/3 w-full overflow-hidden rounded-media">
                                <Image
                                    src={item.src}
                                    alt={item.alt || `Registro visual ${idx + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 580px"
                                    className="object-contain"
                                />
                            </CaseImageReveal>
                        </div>
                    ))}
                </LayoutGrid>
            </section>
        );
    }

    const item = items[0];
    return (
        <section className="w-full py-10 sm:py-16">
            <LayoutGrid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                    <CaseImageReveal className="relative aspect-video w-full overflow-hidden rounded-media">
                        <Image
                            src={item.src}
                            alt={item.alt || "Registro visual do projeto"}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            className="object-contain"
                        />
                    </CaseImageReveal>
                </div>
            </LayoutGrid>
        </section>
    );
}

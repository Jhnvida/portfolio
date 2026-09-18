import Image from "next/image";
import { CaseBlock } from "../../types";

interface CaseMediaBlockProps {
    block: Extract<CaseBlock, { type: "media" }>;
}

export function CaseMediaBlock({ block }: CaseMediaBlockProps) {
    const { layout, items } = block;

    if (layout === "full") {
        const item = items[0];
        return (
            <section className="w-full bg-black relative">
                <div className="w-full relative h-[60vh] md:h-[85vh]">
                    <Image
                        src={item.src}
                        alt={item.alt || "Case media"}
                        fill
                        loading="eager"
                        className="object-cover"
                    />
                </div>
            </section>
        );
    }

    if (layout === "grid-2") {
        return (
            <section className="w-full bg-background relative">
                <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative w-full aspect-4/3 bg-surface-raised rounded-sm overflow-hidden"
                            >
                                <Image src={item.src} alt={item.alt || "Case detail"} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const item = items[0];

    return (
        <section className="w-full bg-background relative py-8 md:py-16">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24">
                <div className="relative w-full aspect-video bg-surface-raised rounded-sm overflow-hidden">
                    <Image src={item.src} alt={item.alt || "Case media"} fill className="object-cover" />
                </div>
            </div>
        </section>
    );
}

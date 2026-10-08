import Image from "next/image";
import { MediaProps } from "../../types";
import { Reveal } from "../ui/Reveal";

export function Media({ block }: MediaProps) {
    const { layout, items } = block;

    return (
        <div className="flex flex-col border-t border-line/60 pt-8 sm:pt-10">
            <span className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">Registro Visual</span>

            {layout === "grid-2" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full">
                    {items.map((item, idx) => (
                        <Reveal
                            key={idx}
                            variant="media"
                            className="relative aspect-4/3 w-full overflow-hidden rounded-media bg-surface"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || `Registro visual ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 580px"
                                className="object-cover"
                            />
                        </Reveal>
                    ))}
                </div>
            ) : (
                <Reveal
                    variant="media"
                    className="relative aspect-16/10 sm:aspect-21/10 w-full overflow-hidden rounded-media bg-surface"
                >
                    <Image
                        src={items[0].src}
                        alt={items[0].alt || "Registro visual do projeto"}
                        fill
                        loading="eager"
                        sizes="(max-width: 1024px) 100vw, 1200px"
                        className="object-cover"
                    />
                </Reveal>
            )}
        </div>
    );
}

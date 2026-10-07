import Image from "next/image";
import { MediaProps } from "../../types";
import { Grid } from "../layout/Grid";
import { Reveal } from "../ui/Reveal";

export function Media({ block }: MediaProps) {
    const { layout, items } = block;

    if (layout === "full") {
        const item = items[0];
        return (
            <section className="w-full py-8 sm:py-14">
                <Grid>
                    <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                        <Reveal
                            variant="media"
                            className="relative aspect-16/10 sm:aspect-21/10 w-full overflow-hidden rounded-media bg-surface"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || "Registro visual do projeto"}
                                fill
                                loading="eager"
                                sizes="(max-width: 1024px) 100vw, 1200px"
                                className="object-cover"
                            />
                        </Reveal>
                    </div>
                </Grid>
            </section>
        );
    }

    if (layout === "grid-2") {
        return (
            <section className="w-full py-8 sm:py-14">
                <Grid>
                    {items.map((item, idx) => (
                        <div key={idx} className="col-span-4 sm:col-span-4 lg:col-span-6 mb-5 sm:mb-0 last:mb-0">
                            <Reveal
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
                        </div>
                    ))}
                </Grid>
            </section>
        );
    }

    const item = items[0];
    return (
        <section className="w-full py-8 sm:py-14">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                    <Reveal
                        variant="media"
                        className="relative aspect-16/10 sm:aspect-video w-full overflow-hidden rounded-media bg-surface"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt || "Registro visual do projeto"}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            className="object-cover"
                        />
                    </Reveal>
                </div>
            </Grid>
        </section>
    );
}

import { CaseBlock } from "../../types";
import { LayoutGrid } from "../layout/LayoutGrid";

interface CaseEditorialBlockProps {
    block: Extract<CaseBlock, { type: "editorial" }>;
}

export function CaseEditorialBlock({ block }: CaseEditorialBlockProps) {
    return (
        <section className="w-full py-10 sm:py-14">
            <LayoutGrid>
                {block.title ? (
                    <>
                        <div className="col-span-4 sm:col-span-3 lg:col-span-4 mb-4 sm:mb-0">
                            <h2 className="text-title font-medium text-ink">{block.title}</h2>
                        </div>
                        <div className="col-span-4 sm:col-span-5 lg:col-span-8 flex flex-col gap-4 text-body text-ink-2 leading-relaxed">
                            {block.paragraphs.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}

                            {block.list && block.list.length > 0 && (
                                <ul className="mt-2 flex flex-col gap-2.5 pt-4 border-t border-line text-list text-ink-2">
                                    {block.list.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <span className="text-ink-3 select-none leading-none pt-1">—</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-5 flex flex-col gap-4 text-body text-ink-2 leading-relaxed">
                        {block.paragraphs.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </LayoutGrid>
        </section>
    );
}

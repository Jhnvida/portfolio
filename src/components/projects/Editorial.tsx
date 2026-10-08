import { Minus } from "lucide-react";
import { EditorialProps } from "../../types";

export function Editorial({ block }: EditorialProps) {
    return (
        <div className="flex flex-col border-t border-line/60 pt-8 sm:pt-10">
            {block.title && <h2 className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">{block.title}</h2>}

            <div className="flex flex-col gap-4 text-body text-ink-2 leading-relaxed max-w-2xl">
                {block.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </div>

            {block.list && block.list.length > 0 && (
                <ul className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-line/60 text-list text-ink-2 max-w-2xl">
                    {block.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <Minus
                                aria-hidden
                                size={12}
                                strokeWidth={2}
                                className="text-ink-3 shrink-0 mt-1 select-none"
                            />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

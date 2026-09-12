import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

export interface SectionHeaderProps {
    title: string;
    description: string;
    link?: {
        href: string;
        label: string;
    };
    className?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ title, description, link, className = "" }, ref) => {
        return (
            <div className={`w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 mb-12 ${className}`}>
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
                    <div>
                        <h2
                            data-header-anim
                            className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4"
                        >
                            {title}
                        </h2>
                        <p data-header-anim className="text-neutral-400 text-lg max-w-xl">
                            {description}
                        </p>
                    </div>

                    {link && (
                        <div data-header-anim className="flex lg:justify-end lg:items-end">
                            <Link
                                href={link.href}
                                className="group inline-flex items-center gap-2 text-white font-medium hover:text-neutral-300 transition-colors"
                            >
                                {link.label}
                                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

SectionHeader.displayName = "SectionHeader";

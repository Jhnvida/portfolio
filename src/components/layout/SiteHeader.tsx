import Link from "next/link";
import { CONTACT_ANCHOR, SITE } from "../../data/site";
import { LayoutGrid } from "./LayoutGrid";
import { NavPill } from "./NavPill";

export function SiteHeader() {
    return (
        <header
            style={{ viewTransitionName: "site-header" }}
            className="relative z-10 w-full pt-[max(1.25rem,env(safe-area-inset-top))] pb-6"
        >
            <LayoutGrid className="flex items-center justify-between sm:justify-normal sm:grid">
                <div className="shrink-0 sm:col-span-2 lg:col-span-3 flex items-center">
                    <Link
                        href="/"
                        aria-label={`${SITE.name}, página inicial`}
                        className="group inline-flex items-center py-1"
                    >
                        <span className="font-serif italic text-[1.25rem] sm:text-[1.3125rem] font-normal tracking-[-0.02em] text-ink transition-opacity duration-200 group-hover:opacity-60">
                            {SITE.name}
                            <span className="text-ink-3 not-italic">.</span>
                        </span>
                    </Link>
                </div>

                <div className="sm:col-span-4 lg:col-span-6 flex justify-end sm:justify-center">
                    <NavPill />
                </div>

                <div className="hidden sm:flex sm:col-span-2 lg:col-span-3 justify-end items-center">
                    <a
                        href={`#${CONTACT_ANCHOR}`}
                        className="inline-flex h-8 items-center rounded-full px-3 text-meta text-ink-2 transition-colors duration-200 hover:text-ink"
                    >
                        Contato
                    </a>
                </div>
            </LayoutGrid>
        </header>
    );
}

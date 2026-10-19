"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

interface PageTransitionContextType {
    isTransitioning: boolean;
    navigate: (href: string) => void;
    registerContainer: (el: HTMLDivElement | null) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
    isTransitioning: false,
    navigate: () => {},
    registerContainer: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const registerContainer = useCallback((el: HTMLDivElement | null) => {
        containerRef.current = el;
    }, []);

    const performNavigate = useCallback(
        (targetHref: string) => {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("cursor:set", { detail: { mode: "default" } }));
            }
            router.push(targetHref);
        },
        [router],
    );

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("cursor:set", { detail: { mode: "default" } }));
        }

        ScrollTrigger.refresh();
    }, [pathname]);

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const target = e.target as HTMLElement | null;
            const anchor = target?.closest<HTMLAnchorElement>("a[href]");
            if (!anchor) return;

            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download")) return;
            if (anchor.getAttribute("rel")?.includes("external")) return;
            if (anchor.hasAttribute("data-no-transition")) return;

            const href = anchor.getAttribute("href");
            if (!href) return;
            if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

            let targetUrl: URL;
            try {
                targetUrl = new URL(anchor.href, window.location.href);
            } catch {
                return;
            }

            if (targetUrl.origin !== window.location.origin) return;

            if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
                if (targetUrl.hash) return;

                e.preventDefault();
                return;
            }

            e.preventDefault();
            performNavigate(targetUrl.pathname + targetUrl.search + targetUrl.hash);
        };

        document.addEventListener("click", handleDocumentClick, { capture: true });

        return () => {
            document.removeEventListener("click", handleDocumentClick, { capture: true });
        };
    }, [performNavigate]);

    const contextValue = useMemo<PageTransitionContextType>(() => {
        return {
            isTransitioning,
            navigate: performNavigate,
            registerContainer,
        };
    }, [isTransitioning, performNavigate, registerContainer]);

    return <PageTransitionContext.Provider value={contextValue}>{children}</PageTransitionContext.Provider>;
}

export function PageTransitionContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const { registerContainer } = usePageTransition();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        registerContainer(contentRef.current);
        return () => registerContainer(null);
    }, [registerContainer]);

    return (
        <div ref={contentRef} className={`flex-1 flex flex-col w-full ${className}`}>
            {children}
        </div>
    );
}

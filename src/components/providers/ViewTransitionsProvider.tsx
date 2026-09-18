"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
    AnchorHTMLAttributes,
    createContext,
    ReactNode,
    startTransition,
    use,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

const ViewTransitionsContext = createContext<((cb: () => void) => void) | null>(null);

function useBrowserNativeTransitions() {
    const pathname = usePathname();
    const currentPathname = useRef(pathname);
    const [currentViewTransition, setCurrentViewTransition] = useState<
        [Promise<void>, () => void] | null
    >(null);

    useEffect(() => {
        if (!("startViewTransition" in document)) {
            return;
        }

        const onPopState = () => {
            let pendingViewTransitionResolve: () => void;
            const pendingViewTransition = new Promise<void>((resolve) => {
                pendingViewTransitionResolve = resolve;
            });

            const pendingStartViewTransition = new Promise<void>((resolve) => {
                (document as unknown as { startViewTransition: (cb: () => Promise<void>) => void }).startViewTransition(() => {
                    resolve();
                    return pendingViewTransition;
                });
            });

            setCurrentViewTransition([
                pendingStartViewTransition,
                pendingViewTransitionResolve!,
            ]);
        };

        window.addEventListener("popstate", onPopState);
        return () => {
            window.removeEventListener("popstate", onPopState);
        };
    }, []);

    const transitionRef = useRef(currentViewTransition);
    useEffect(() => {
        transitionRef.current = currentViewTransition;
    }, [currentViewTransition]);

    useEffect(() => {
        currentPathname.current = pathname;
        if (transitionRef.current) {
            transitionRef.current[1]();
            transitionRef.current = null;
        }
    }, [pathname]);
}

export function ViewTransitions({ children }: { children: ReactNode }) {
    const [finishViewTransition, setFinishViewTransition] = useState<(() => void) | null>(null);

    useEffect(() => {
        if (finishViewTransition) {
            finishViewTransition();
            setFinishViewTransition(null);
        }
    }, [finishViewTransition]);

    useBrowserNativeTransitions();

    return (
        <ViewTransitionsContext.Provider value={setFinishViewTransition}>
            {children}
        </ViewTransitionsContext.Provider>
    );
}

export function useTransitionRouter() {
    const router = useRouter();
    const finishContext = use(ViewTransitionsContext);

    const triggerTransition = useCallback(
        (cb: () => void) => {
            if (
                "startViewTransition" in document &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                (document as unknown as { startViewTransition: (cb: () => Promise<void>) => void }).startViewTransition(
                    () =>
                        new Promise<void>((resolve) => {
                            startTransition(() => {
                                cb();
                                if (finishContext) {
                                    finishContext(() => resolve);
                                } else {
                                    resolve();
                                }
                            });
                        })
                );
            } else {
                cb();
            }
        },
        [finishContext]
    );

    const push = useCallback(
        (href: string, options?: { scroll?: boolean }) => {
            triggerTransition(() => router.push(href, options));
        },
        [router, triggerTransition]
    );

    const replace = useCallback(
        (href: string, options?: { scroll?: boolean }) => {
            triggerTransition(() => router.replace(href, options));
        },
        [router, triggerTransition]
    );

    return useMemo(
        () => ({
            ...router,
            push,
            replace,
        }),
        [router, push, replace]
    );
}

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
    NextLinkProps & {
        children?: ReactNode;
    };

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget.getAttribute("target");
    return (
        (target && target !== "_self") ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (event.nativeEvent && event.nativeEvent.which === 2)
    );
}

export function Link(props: LinkProps) {
    const router = useTransitionRouter();
    const { href, as, replace, scroll, onClick, ...rest } = props;

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onClick) {
                onClick(e);
            }

            if (e.defaultPrevented) {
                return;
            }

            if (isModifiedEvent(e)) {
                return;
            }

            const hrefStr = href.toString();
            if (hrefStr.startsWith("http") || hrefStr.startsWith("mailto:") || hrefStr.startsWith("tel:") || hrefStr.startsWith("#")) {
                return;
            }

            if (
                "startViewTransition" in document &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                e.preventDefault();
                const navigate = replace ? router.replace : router.push;
                navigate(as ? as.toString() : hrefStr, {
                    scroll: scroll ?? true,
                });
            }
        },
        [onClick, href, as, replace, scroll, router]
    );

    return <NextLink {...props} onClick={handleClick} />;
}

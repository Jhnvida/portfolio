interface SharedElementRect {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
}

export interface SharedElementData {
    slug: string;
    imageSrc: string;
    alt: string;
    rect: SharedElementRect;
}

export interface PageTransitionContextType {
    isTransitioning: boolean;
    activeSlug: string | null;
    isDestinationReady: boolean;
    navigate: (href: string) => void;
    registerDestination: (slug: string, el: HTMLElement | null) => void;
}

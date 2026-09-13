export interface Project {
    id: string;
    title: string;
    client: string;
    category: string;
    impact: string;
    image: string;
    slug: string;
}

export interface ProcessStep {
    id: string;
    number: string;
    title: string;
    description: string;
}

export interface ServiceItem {
    id: string;
    number: string;
    title: string;
    tags: string;
    description: string;
    ctaLabel: string;
}

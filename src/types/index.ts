export interface Project {
    id: string;
    title: string;
    client: string;
    category: string;
    impact: string;
    image: string;
    slug: string;
    stack: string[];
    year: string;
    overview: string;
    challenge?: string;
    solution?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
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

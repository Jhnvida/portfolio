export interface Project {
    id: string;
    title: string;
    client: string;
    impact: string;
    image: string;
    slug: string;
    stack: string[];
    year: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    content: CaseBlock[];
}

export type CaseBlock =
    | {
          type: "editorial";
          title?: string;
          paragraphs: string[];
          list?: string[];
      }
    | {
          type: "media";
          layout: "full" | "container" | "grid-2";
          items: { src: string; type: "image" | "video"; alt?: string }[];
      };

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

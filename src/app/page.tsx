import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { ProjectGallery } from "@/components/home/project-gallery";

export default function HomePage() {
    return (
        <>
            <Hero />
            <ProjectGallery />
            <About />
        </>
    );
}

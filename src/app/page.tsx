import { Hero } from "@/components/home/hero";
import { PersonalIntro } from "@/components/home/personal-intro";
import { ProjectGallery } from "@/components/home/project-gallery";

export default function HomePage() {
    return (
        <>
            <Hero />

            <div className="relative z-10 bg-white">
                <ProjectGallery />
                <PersonalIntro />
            </div>
        </>
    );
}

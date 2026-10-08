import { HomeView } from "../components/home/HomeView";
import { Weather } from "../components/home/Weather";
import { getFeaturedProjects } from "../data/projects";

export default function HomePage() {
    const featuredProjects = getFeaturedProjects();
    return <HomeView weather={<Weather />} featuredProjects={featuredProjects} />;
}

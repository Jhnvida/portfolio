import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Showcase />
        </div>
    );
}

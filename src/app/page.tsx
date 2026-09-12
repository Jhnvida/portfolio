import { Hero } from "../components/sections/Hero";
import { MarqueeStack } from "../components/sections/MarqueeStack";
import { Process } from "../components/sections/Process";
import { SelectedWork } from "../components/sections/SelectedWork";

export default function Home() {
    return (
        <main className="w-full pt-32 pb-12">
            <Hero />
            <MarqueeStack />
            <SelectedWork />
            <Process />
        </main>
    );
}

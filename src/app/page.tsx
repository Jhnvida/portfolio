import { Hero, MarqueeStack, Process, SelectedWork, Services } from "../components/sections";
import { SectionProgressRail } from "../components/ui/SectionProgressRail";

export default function Home() {
    return (
        <main className="w-full pt-32 pb-12 relative">
            <SectionProgressRail />
            <Hero />
            <MarqueeStack />
            <SelectedWork />
            <Process />
            <Services />
        </main>
    );
}

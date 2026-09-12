import { Hero, MarqueeStack, Process, SelectedWork } from "../components/sections";

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

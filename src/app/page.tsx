import { Hero, MarqueeStack, Process, SelectedWork, Services } from "../components/sections";

export default function Home() {
    return (
        <main className="w-full pt-32 pb-12">
            <Hero />
            <MarqueeStack />
            <SelectedWork />
            <Process />
            <Services />
        </main>
    );
}

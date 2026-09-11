import { Hero } from "../components/sections/Hero";
import { MarqueeStack } from "../components/sections/MarqueeStack";

export default function Home() {
    return (
        <main className="w-full min-h-screen pt-32 pb-12 flex flex-col justify-center">
            <Hero />
            <MarqueeStack />
        </main>
    );
}

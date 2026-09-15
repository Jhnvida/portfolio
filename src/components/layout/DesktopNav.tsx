import Link from "next/link";
import { HEADER_LINKS } from "../../data/navigation";

export function DesktopNav() {
    return (
        <nav className="hidden md:flex flex-none gap-8 text-sm font-medium">
            {HEADER_LINKS.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className="relative text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1 py-1"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

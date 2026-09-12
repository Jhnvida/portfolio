"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const VERTICES: [number, number, number][] = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
];

const EDGES: { v: [number, number]; code: string }[] = [
    { v: [0, 1], code: ":root { --color-surface-dark: #050505; --color-accent: #ffffff; " },
    { v: [1, 2], code: "--color-text-primary: #ffffff; --color-text-muted: #a0a0a0; " },
    { v: [2, 3], code: "--color-border-subtle: #1f1f1f; --color-accent-text: #050505; " },
    { v: [3, 0], code: "--container-page: 1400px; --color-surface-raised: #141414; } " },
    { v: [4, 5], code: "@theme inline { --color-background: var(--color-surface-dark); " },
    { v: [5, 6], code: "--color-foreground: var(--color-text-primary); --font-sans: sans; " },
    { v: [6, 7], code: "--color-border: var(--color-border-subtle); --font-heading: serif; " },
    { v: [7, 4], code: "--color-accent-foreground: var(--color-accent-text); } " },
    { v: [0, 4], code: "export function Hero() { const ref = useRef<HTMLDivElement>(null); " },
    { v: [1, 5], code: "useGSAP(() => { gsap.from(items, { opacity: 0, y: 30, duration: 0.8 }); " },
    { v: [2, 6], code: "type Project = { id: string; title: string; client: string; impact: string; }; " },
    { v: [3, 7], code: "const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }; " },
];

function rotatePoint([x, y, z]: [number, number, number], rx: number, ry: number): [number, number, number] {
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    return [x2, y1, z2];
}

function project(
    [x, y, z]: [number, number, number],
    cx: number,
    cy: number,
    scale: number,
    fov: number,
): [number, number, number] {
    const d = fov / (fov + z * scale);
    return [cx + x * scale * d, cy + y * scale * d, z];
}

export function CodeCube() {
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const textRefs = useRef<(SVGTextElement | null)[]>([]);
    const textPathRefs = useRef<(SVGTextPathElement | null)[]>([]);

    const rotRef = useRef({ x: -0.4, y: 0.5 });
    const mouseOffsetRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);
    const introRef = useRef({ progress: 0 });

    useGSAP(() => {
        const SVG_CX = 150;
        const SVG_CY = 150;
        const SCALE = 95;
        const FOV = 380;

        gsap.to(introRef.current, {
            progress: 1,
            duration: 2.5,
            ease: "expo.out",
            delay: 0.2,
        });

        const handleMouseMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            mouseOffsetRef.current.x = ((e.clientX - cx) / cx) * 0.8;
            mouseOffsetRef.current.y = ((e.clientY - cy) / cy) * 0.8;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const ticker = gsap.ticker.add(() => {
            timeRef.current += 0.003;

            const targetX = -0.4 + Math.sin(timeRef.current * 0.5) * 0.2 - mouseOffsetRef.current.y;
            const targetY = 0.5 + timeRef.current + mouseOffsetRef.current.x;

            rotRef.current.x += (targetX - rotRef.current.x) * 0.05;
            rotRef.current.y += (targetY - rotRef.current.y) * 0.05;

            const projected = VERTICES.map((v) =>
                project(rotatePoint(v, rotRef.current.x, rotRef.current.y), SVG_CX, SVG_CY, SCALE, FOV),
            );

            const p = introRef.current.progress;

            EDGES.forEach(({ v }, i) => {
                const [x1, y1, z1] = projected[v[0]];
                const [x2, y2, z2] = projected[v[1]];

                const avgZ = (z1 + z2) / 2;
                const normalizedZ = (avgZ + 1) / 2;
                const opacity = (0.05 + normalizedZ * 0.8) * p;

                if (pathRefs.current[i]) {
                    pathRefs.current[i]!.setAttribute(
                        "d",
                        `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)}`,
                    );
                }

                if (textRefs.current[i]) {
                    textRefs.current[i]!.style.opacity = opacity.toFixed(3);
                }

                if (textPathRefs.current[i]) {
                    const offset = (1 - p) * 50;
                    textPathRefs.current[i]!.setAttribute("startOffset", `${offset.toFixed(1)}%`);
                }
            });
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            gsap.ticker.remove(ticker);
        };
    });

    return (
        <div className="w-full h-full flex items-center justify-center select-none">
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ overflow: "visible" }} aria-hidden="true">
                <defs>
                    {EDGES.map((_, i) => (
                        <path
                            key={i}
                            id={`cube-edge-${i}`}
                            ref={(el) => {
                                pathRefs.current[i] = el;
                            }}
                        />
                    ))}
                </defs>

                {EDGES.map(({ code }, i) => (
                    <text
                        key={i}
                        ref={(el) => {
                            textRefs.current[i] = el;
                        }}
                        style={{
                            fontFamily: "'Courier New', Courier, monospace",
                            fontSize: "8.5px",
                            fill: "rgba(255, 255, 255, 1)",
                            letterSpacing: "0.5px",
                            opacity: 0,
                        }}
                    >
                        <textPath
                            href={`#cube-edge-${i}`}
                            startOffset="50%"
                            ref={(el) => {
                                textPathRefs.current[i] = el;
                            }}
                        >
                            {(code + " ").repeat(6)}
                        </textPath>
                    </text>
                ))}
            </svg>
        </div>
    );
}

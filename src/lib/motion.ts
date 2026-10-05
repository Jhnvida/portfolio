import type { CSSProperties } from "react";

export function enter(index = 0) {
    return {
        "data-enter": "",
        style: { "--i": index } as CSSProperties,
    };
}

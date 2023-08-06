import { TransformResult } from 'vite';

declare function macrosPlugin(): {
    readonly name: "babel-macros";
    readonly enforce: "pre";
    readonly transform: (source: string, filename: string) => Promise<TransformResult | null | undefined>;
};

export { macrosPlugin as default };

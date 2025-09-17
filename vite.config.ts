import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import pkg from './package.json'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "./lib/index.ts"),
            name: "RelayBee",
            fileName: 'relay-bee',
            formats: ['es']
        },
        rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies || {})],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'lib',
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
            }
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    plugins: [react(), dts({ rollupTypes: true })],
    css: {
        postcss: {
          plugins: [tailwindcss],
        },
    },
});

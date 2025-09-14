import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
          index: resolve(__dirname, "./lib/index.ts"),
          'components/index': resolve(__dirname, "./lib/components/index.ts"),
          'util/index': resolve(__dirname, "./lib/util/index.ts"),
      },
      name: "relay-bee",
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
      react(),
      dts({rollupTypes: true})
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "wrapsplash",
      fileName: (format) => `wrapsplash.${format}.js`,
    },
    rollupOptions: {
      external: ["axios"],
      output: {
        exports: "named",
        globals: {
          axios: "axios",
        },
      },
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.spec.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});

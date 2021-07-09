import { defineConfig } from "vite";
import { resolve } from "path";
import mix, { vercelAdapter } from "vite-plugin-mix";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    mix({
      handler: "./handler.ts",
      adapter: vercelAdapter()
    }),
  ],
});

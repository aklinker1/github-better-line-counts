import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import { resolve } from "node:path";
import manifest from "./manifest.json" with { type: "json" };

export default defineConfig({
  plugins: [crx({ manifest }), vue(), Icons({ compiler: "vue3" })],
  resolve: {
    alias: {
      "@": resolve("src"),
      "~": resolve("src"),
    },
  },
});

import { defineConfig } from "wxt";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  srcDir: "src",
  // TODO: Switch to vite.UserConfig
  vite: {
    plugins: [Icons({ compiler: "vue3" }), Vue()],
  },
  manifest: {
    // TODO: Only apply api.github.com permission to firefox
    permissions: ["storage", "https://api.github.com/*"],
  },
});

import { defineConfig } from "wxt";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  srcDir: "src",
  imports: {
    presets: ["vue", "vue-router", "@vueuse/core"],
    imports: [
      { from: "vue-query", name: "useQuery" },
      { from: "vue-query", name: "useMutation" },
    ],
  },
  // TODO: Switch to vite.UserConfig
  vite: {
    plugins: [Icons({ compiler: "vue3" }), Vue()],
  },
  manifest: {
    // TODO: Allow icon customization
    // TODO: Only apply api.github.com permission to firefox
    permissions: ["storage", "https://api.github.com/*"],
  },
});

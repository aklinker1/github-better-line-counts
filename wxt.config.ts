import type { UserManifest } from "wxt";
import { defineConfig } from "wxt";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-vue"],
  imports: {
    presets: ["vue-router", "@vueuse/core"],
    imports: [
      { from: "vue-query", name: "useQuery" },
      { from: "vue-query", name: "useMutation" },
    ],
  },
  vite: () => ({
    plugins: [Icons({ compiler: "vue3" })],
  }),
  manifest: ({ browser }) => {
    const permissions = ["storage"];
    if (browser === "firefox") {
      permissions.push("https://api.github.com/*");
    }
    return {
      permissions,
    };
  },
});

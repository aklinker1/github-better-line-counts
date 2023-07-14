import { UserManifest, defineConfig } from "wxt";
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
  vite: {
    plugins: [Icons({ compiler: "vue3" }), Vue()],
  },
  manifest: ({ browser }) => {
    const manifest: UserManifest = {
      icons: {
        "16": "icon/16.png",
        "32": "icon/32.png",
        "48": "icon/48.png",
        "96": "icon/96.png",
        "128": "icon/128.png",
      },
      permissions: ["storage"],
    };
    if (browser === "firefox") {
      manifest.permissions!.push("https://api.github.com/*");
    }
    return manifest;
  },
});

import type { UserManifest } from "wxt";
import { defineConfig } from "wxt";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  experimental: {
    entrypointImporter: "vite-node",
  },
  modules: ["@wxt-dev/module-vue"],
  imports: {
    presets: ["vue-router", "@vueuse/core"],
    imports: [
      { from: "@tanstack/vue-query", name: "useQuery" },
      { from: "@tanstack/vue-query", name: "useMutation" },
    ],
  },
  vite: () => ({
    plugins: [Icons({ compiler: "vue3" })],
    ssr: {
      // List any dependencies that depend on webextension-polyfill here for vite-node importer to work
      noExternal: ["@webext-core/proxy-service", "@webext-core/messaging"],
    },
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

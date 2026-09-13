import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-vue", "@wxt-dev/i18n/module"],
  imports: {
    presets: ["vue-router"],
    imports: [
      { from: "@pinia/colada", name: "useQuery" },
      { from: "@pinia/colada", name: "useMutation" },
    ],
  },
  zip: {
    includeSources: [
      "src",
      "public",
      ".tool-versions",
      "README.md",
      "bun.lock",
      "package.json",
      "tsconfig.json",
      "wxt.config.ts",
    ],
    dotSources: true,
  },
  suppressWarnings: {
    firefoxDataCollection: true,
    firefoxId: true,
  },
  manifest: ({ browser }) => {
    const permissions = ["storage"];
    if (browser === "firefox") {
      permissions.push("https://api.github.com/*");
    }
    return {
      default_locale: "en",
      name: "__MSG_name__",
      description: "__MSG_description__",
      permissions,
    };
  },
});

import { defineConfig } from "vitest/config";
import AutoImportPlugin from "unplugin-auto-import/vite";

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
  },
  plugins: [
    AutoImportPlugin({
      dts: "src/@types/auto-imports.d.ts",
      dirs: ["src/composables"],
      imports: [
        "vue",
        "@vueuse/core",
        {
          "webextension-polyfill": [["*", "browser"]],
        },
        {
          "vue-query": ["useMutation", "useQuery", "useQueryClient"],
        },
      ],
    }),
  ],
});

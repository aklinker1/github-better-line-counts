import AutoImportPlugin from "unplugin-auto-import/vite";

export function AutoImport() {
  return AutoImportPlugin({
    dts: "src/@types/auto-imports.d.ts",
    dirs: ["src/composition"],
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
  });
}

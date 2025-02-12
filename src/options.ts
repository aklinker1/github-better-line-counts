import Options from "@/pages/Options.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { i18n } from "./utils/i18n";
import { createApp } from "vue";

document.title = i18n.t("options.title");

createApp(Options).use(VueQueryPlugin).mount(document.body);

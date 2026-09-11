import Options from "@/pages/Options.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createVaporApp } from "vue";

document.title = i18n.t("options.title");

createVaporApp(Options).use(VueQueryPlugin).mount(document.body);

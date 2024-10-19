import Options from "@/pages/Options.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

document.title = i18n.t("options.title");

createApp(Options).use(VueQueryPlugin).mount(document.body);

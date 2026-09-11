import Options from "@/pages/Options.vue";
import { PiniaColada } from "@pinia/colada";
import { createPinia } from "pinia";
import { createVaporApp } from "vue";

document.title = i18n.t("options.title");

createVaporApp(Options)
  .use(createPinia())
  .use(PiniaColada as any)
  .mount(document.body);

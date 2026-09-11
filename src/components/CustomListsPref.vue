<script lang="ts" vapor>
import { computed } from "vue";
import type { CustomLists } from "@/utils/storage";
import CustomListItem from "./CustomListItem.vue";

const customLists = defineModel<CustomLists>("customLists", { required: true });

const all = computed({
  get() {
    return customLists.value.all;
  },
  set(newAll) {
    customLists.value = {
      ...customLists.value,
      all: newAll,
    };
  },
});

const { t } = i18n;
</script>

<template>
  <div class="col gap-4">
    <!-- Header -->
    <div class="col gap-2">
      <p class="setting-title">
        {{ t("options.customLists.title") }}
      </p>
      <p>
        {{ t("options.customLists.description1") }}
        <a
          class="link"
          href="https://github.com/isaacs/minimatch#features"
          target="_blank"
          >{{ t("options.customLists.description2") }}</a
        >
        {{ t("options.customLists.description3") }}
      </p>
    </div>

    <!-- All Repos -->
    <CustomListItem v-model:value="all">{{
      i18n.t("options.customLists.allRepos")
    }}</CustomListItem>
  </div>
</template>

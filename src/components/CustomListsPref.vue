<script lang="ts" setup>
import { computed } from "vue";
import type { CustomLists } from "@/utils/storage";
import CustomListItem from "./CustomListItem.vue";

const props = defineProps<{
  customLists: CustomLists;
}>();

const emits = defineEmits<{
  (event: "update:customLists", newValue: CustomLists): void;
}>();

const customLists = useVModel(props, "customLists", emits);
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
  <li class="flex flex-col gap-4">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">
        {{ t("options.customLists.title") }}
      </p>
      <p class="text-base">
        {{ t("options.customLists.description1") }}
        <a
          class="link link-secondary"
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
  </li>
</template>

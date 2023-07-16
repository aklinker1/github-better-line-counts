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
</script>

<template>
  <li class="flex flex-col gap-4">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">Custom Lists</p>
      <p class="text-base">
        Use
        <a
          class="link link-secondary"
          href="https://github.com/isaacs/minimatch#features"
          target="_blank"
          >minimatch</a
        >
        glob patterns to mark files as generated accross all repos.
      </p>
    </div>

    <!-- All Repos -->
    <CustomListItem v-model:value="all">All Repos</CustomListItem>
  </li>
</template>

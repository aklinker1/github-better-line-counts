<script lang="ts" setup>
import { i18n } from "@/utils/i18n";

defineProps<{
  value: string;
}>();

const emits = defineEmits<{
  (event: "update:value", newValue: string): void;
}>();
</script>

<template>
  <div class="rounded border divide-y">
    <div class="py-2 px-2.5 font-bold"><slot /></div>

    <textarea
      class="font-mono p-2 w-full resize-y m-0 outline-none border-0 -mb-1 min-h-[5rem]"
      :placeholder="i18n.t('options.customLists.customRepoPlaceholder')"
      :value="value"
      @input="
        emits('update:value', ($event.target as HTMLTextAreaElement).value)
      "
    />
  </div>
</template>

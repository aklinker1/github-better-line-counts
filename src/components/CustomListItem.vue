<script lang="ts" setup>
const props = defineProps<{
  value: string;
}>();

const emits = defineEmits<{
  (event: "update:value", newValue: string): void;
}>();

const { t } = i18n;
</script>

<template>
  <div class="rounded border divide-y">
    <div class="py-2 px-2.5 font-bold"><slot /></div>

    <textarea
      class="font-mono p-2 w-full resize-y m-0 outline-none -mb-1 min-h-[5rem]"
      :placeholder="t('options_customLists_customRepoPlaceholder')"
      :value="value"
      @input="
        emits('update:value', ($event.target as HTMLTextAreaElement).value)
      "
    />
  </div>
</template>

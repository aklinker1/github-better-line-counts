<script lang="ts" vapor>
defineProps<{
  value: string;
}>();

const emits = defineEmits<{
  (event: "update:value", newValue: string): void;
}>();
</script>

<template>
  <div class="item">
    <p class="font-bold"><slot /></p>

    <textarea
      class="font-mono"
      :placeholder="i18n.t('options.customLists.customRepoPlaceholder')"
      :value="value"
      @input="
        emits('update:value', ($event.target as HTMLTextAreaElement).value)
      "
    />
  </div>
</template>

<style scoped>
.item {
    border: 1px solid var(--c-neutral);
    border-radius: calc(2 * var(--spacing));
    display: flex;
    flex-direction: column;
}
.item>* {
    padding: calc(2 * var(--spacing));
}
.item>:first-child {
    border-bottom: 1px solid var(--c-neutral);
}
textarea {
    resize: vertical;
    min-height: 5rem;
}
</style>

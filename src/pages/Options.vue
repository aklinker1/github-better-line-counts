<script lang="ts" vapor>
import OptionsForm from "@/components/OptionsForm.vue";
import useStorageValue from "@/composables/useStorageValue";

const hideGeneratedLineCount = useStorageValue(hideGeneratedLineCountStorage);
const githubPat = useStorageValue(githubPatStorage);
const customLists = useStorageValue(customListsStorage);
</script>

<template>
  <OptionsForm
    v-if="
      hideGeneratedLineCount != null && githubPat != null && customLists != null
    "
    :hideGeneratedLineCount
    :githubPat
    :customLists
  />
</template>

<script lang="ts" setup>
import TokenPref from "./TokenPref.vue";
import ShowGeneratedCountPref from "./ShowGeneratedCountPref.vue";
import CustomListsPref from "./CustomListsPref.vue";
import {
  hideGeneratedLineCountStorage,
  type CustomLists,
  githubPatStorage,
  customListsStorage,
} from "@/utils/storage";
import { useForm } from "@/composables/useForm";
import { commitHashDiffsCache } from "@/utils/global-cache";
import { i18n } from "@/utils/i18n";

const { state, hasChanges, reset, saveChanges } = useForm<{
  hideGeneratedLineCount: boolean;
  githubPat: string;
  customLists: CustomLists;
}>(
  {
    hideGeneratedLineCount: await hideGeneratedLineCountStorage.getValue(),
    githubPat: await githubPatStorage.getValue(),
    // This value is set when extension is installed.
    customLists: await customListsStorage.getValue(),
  },
  async (newState) => {
    await hideGeneratedLineCountStorage.setValue(
      newState.hideGeneratedLineCount,
    );
    await githubPatStorage.setValue(newState.githubPat);
    await customListsStorage.setValue(newState.customLists);

    // Clear cache
    await commitHashDiffsCache.clear();
  },
);

const { t } = i18n;
</script>

<template>
  <form class="flex flex-col gap-8 pb-20" @submit.prevent="saveChanges">
    <TokenPref v-model:github-pat="state.githubPat" />
    <ShowGeneratedCountPref
      v-model:hide-generated-line-count="state.hideGeneratedLineCount"
    />
    <CustomListsPref v-model:custom-lists="state.customLists" />

    <div
      class="fixed inset-x-0 bottom-0 bg-base-100 flex gap-4 p-4 border-t border-neutral border-opacity-10"
    >
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="!hasChanges"
        @click="saveChanges"
      >
        {{ t("saveChanges") }}
      </button>
      <button class="btn" :disabled="!hasChanges" @click="reset">
        {{ t("discard") }}
      </button>
    </div>
  </form>
</template>

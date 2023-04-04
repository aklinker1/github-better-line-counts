<script lang="ts" setup>
import TokenPref from "./TokenPref.vue";
import ShowGeneratedCountPref from "./ShowGeneratedCountPref.vue";
import { extensionStorage } from "../utils/storage";
import { commitHashDiffsCache } from "../utils/global-cache";

const { state, hasChanges, reset, saveChanges } = useForm(
  {
    hideGeneratedLineCount: !!(await extensionStorage.getItem(
      "hideGeneratedLineCount",
    )),
    githubPat: (await extensionStorage.getItem("githubPat")) ?? "",
  },
  async (newState) => {
    await extensionStorage.setItem(
      "hideGeneratedLineCount",
      newState.hideGeneratedLineCount,
    );
    await extensionStorage.setItem("githubPat", newState.githubPat);

    // Clear cache
    await commitHashDiffsCache.clear();
  },
);
</script>

<template>
  <form class="flex flex-col gap-4 pb-20" @submit.prevent="saveChanges">
    <TokenPref v-model:github-pat="state.githubPat" />
    <ShowGeneratedCountPref
      v-model:hide-generated-line-count="state.hideGeneratedLineCount"
    />

    <div
      class="fixed inset-x-0 bottom-0 bg-base-100 flex gap-4 p-4 border-t border-neutral border-opacity-10"
    >
      <button
        class="btn btn-primary"
        type="submit"
        :disabled="!hasChanges"
        @click="saveChanges"
      >
        Save Changes
      </button>
      <button class="btn" :disabled="!hasChanges" @click="reset">
        Discard
      </button>
    </div>
  </form>
</template>

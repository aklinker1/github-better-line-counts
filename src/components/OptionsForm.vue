<script lang="ts" vapor>
import TokenPref from "./TokenPref.vue";
import ShowGeneratedCountPref from "./ShowGeneratedCountPref.vue";
import CustomListsPref from "./CustomListsPref.vue";
import {
  hideGeneratedLineCountStorage,
  type CustomLists,
  githubPatStorage,
  customListsStorage,
} from "@/utils/storage";
import isDeepEqual from "fast-deep-equal";

const props = defineProps<{
  hideGeneratedLineCount: boolean;
  githubPat: string;
  customLists: CustomLists;
}>();

const hideGeneratedLineCount = ref(props.hideGeneratedLineCount);
const githubPat = ref(props.githubPat);
const customLists = ref(props.customLists);

const reset = () => {
  hideGeneratedLineCount.value = props.hideGeneratedLineCount;
  githubPat.value = props.githubPat;
  customLists.value = props.customLists;
};
const save = async () => {
  await hideGeneratedLineCountStorage.setValue(hideGeneratedLineCount.value);
  await githubPatStorage.setValue(githubPat.value);
  await customListsStorage.setValue(customLists.value);

  // Clear cache
  await commitHashDiffsCache.clear();
};

const hasChanges = computed(
  () =>
    !isDeepEqual(
      toRaw(hideGeneratedLineCount.value),
      toRaw(props.hideGeneratedLineCount),
    ) ||
    !isDeepEqual(toRaw(githubPat.value), toRaw(props.githubPat)) ||
    !isDeepEqual(toRaw(customLists.value), toRaw(props.customLists)),
);

const { t } = i18n;
</script>

<template>
  <form @submit.prevent="save">
    <!-- Settings -->
    <div class="scroll-wrapper">
      <div class="col gap-8 p-4">
        <TokenPref v-model:github-pat="githubPat" />
        <ShowGeneratedCountPref
          v-model:hide-generated-line-count="hideGeneratedLineCount"
        />
        <CustomListsPref v-model:custom-lists="customLists" />
      </div>
    </div>

    <!-- Buttons -->
    <div class="row gap-4 p-4 shrink-0">
      <button class="btn" type="submit" :disabled="!hasChanges">
        {{ t("saveChanges") }}
      </button>
      <button
        class="btn neutral"
        type="button"
        :disabled="!hasChanges"
        @click="reset"
      >
        {{ t("discard") }}
      </button>
    </div>
  </form>
</template>

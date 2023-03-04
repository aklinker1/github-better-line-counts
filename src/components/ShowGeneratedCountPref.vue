<script lang="ts" setup>
import { extensionStorage } from "../utils/storage";

const hideLineCount = ref(
  await extensionStorage.getItem("hideGeneratedLineCount")
);

function toggle() {
  hideLineCount.value = !hideLineCount.value;
  extensionStorage.setItem("hideGeneratedLineCount", hideLineCount.value);
}
</script>

<template>
  <li class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">
        Show Generated Line Counts
      </p>
      <label class="text-base flex gap-4 items-center">
        <input
          class="checkbox checkbox-primary checkbox-sm ml-2"
          type="checkbox"
          :checked="!hideLineCount"
          @change="toggle"
        />
        <p>
          Along with
          <span class="text-success font-medium">+additions</span> and
          <span class="text-error font-medium">−deletions</span>, show a third
          number for
          <span class="text-base-content text-opacity-50 font-medium"
            >⌁generated</span
          >
          lines.
        </p>
      </label>
    </div>
  </li>
</template>

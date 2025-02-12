<script lang="ts" setup>
import { i18n } from "@/utils/i18n";

const hideLineCount = defineModel<boolean>("hideGeneratedLineCount", {
  required: true,
});

function toggle() {
  hideLineCount.value = !hideLineCount.value;
}

const { t } = i18n;
</script>

<template>
  <li class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">
        {{ t("options.enabled.title") }}
      </p>
      <label class="text-base flex gap-4 items-center">
        <input
          class="checkbox checkbox-primary checkbox-sm ml-2"
          type="checkbox"
          :checked="!hideLineCount"
          @change="toggle"
        />
        <p>
          {{ t("options.enabled.description1") }}
          <span class="text-success font-medium">{{
            t("options.enabled.description2")
          }}</span>
          {{ t("options.enabled.description3") }}
          <span class="text-error font-medium">{{
            t("options.enabled.description4")
          }}</span
          >{{ t("options.enabled.description5") }}
          <span class="text-base-content text-opacity-50 font-medium">{{
            t("options.enabled.description6")
          }}</span>
          {{ t("options.enabled.description7") }}
        </p>
      </label>
    </div>
  </li>
</template>

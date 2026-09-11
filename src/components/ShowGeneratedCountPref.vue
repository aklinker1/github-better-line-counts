<script lang="ts" vapor>
const hideLineCount = defineModel<boolean>("hideGeneratedLineCount", {
  required: true,
});

function toggle() {
  hideLineCount.value = !hideLineCount.value;
}

const { t } = i18n;
</script>

<template>
  <div class="col gap-4">
    <div class="col gap-2">
      <p class="setting-title">
        {{ t("options.enabled.title") }}
      </p>
      <label class="row gap-4 items-center">
        <input
          class="p-3 size-4 ml-2"
          type="checkbox"
          :checked="!hideLineCount"
          @change="toggle"
        />
        <p class="flex-1">
          {{ t("options.enabled.description1") }}
          <span class="text-green font-medium">{{
            t("options.enabled.description2")
          }}</span>
          {{ t("options.enabled.description3") }}
          <span class="text-red font-medium">{{
            t("options.enabled.description4")
          }}</span
          >{{ t("options.enabled.description5") }}
          <span class="opacity-50 font-medium">{{
            t("options.enabled.description6")
          }}</span>
          {{ t("options.enabled.description7") }}
        </p>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  hideGeneratedLineCount: boolean;
}>();

const emits = defineEmits<{
  (event: "update:hideGeneratedLineCount", newHide: boolean): void;
}>();

const hideLineCount = useVModel(props, "hideGeneratedLineCount", emits);

function toggle() {
  hideLineCount.value = !hideLineCount.value;
}

const { t } = i18n;
</script>

<template>
  <li class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">
        {{ t("options_enabled_title") }}
      </p>
      <label class="text-base flex gap-4 items-center">
        <input
          class="checkbox checkbox-primary checkbox-sm ml-2"
          type="checkbox"
          :checked="!hideLineCount"
          @change="toggle"
        />
        <p>
          {{ t("options_enabled_description1") }}
          <span class="text-success font-medium">{{
            t("options_enabled_description2")
          }}</span>
          {{ t("options_enabled_description3") }}
          <span class="text-error font-medium">{{
            t("options_enabled_description4")
          }}</span
          >{{ t("options_enabled_description5") }}
          <span class="text-base-content text-opacity-50 font-medium">{{
            t("options_enabled_description6")
          }}</span>
          {{ t("options_enabled_description7") }}
        </p>
      </label>
    </div>
  </li>
</template>

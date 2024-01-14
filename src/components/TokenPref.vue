<script lang="ts" setup>
import IMdiEye from "~icons/mdi/eye";
import IMdiEyeOffOutline from "~icons/mdi/eye-off-outline";

const props = defineProps<{
  githubPat: string;
}>();

const emits = defineEmits<{
  (event: "update:githubPat", newToken: string): void;
}>();

const token = useVModel(props, "githubPat", emits);

const { data: user, error, isLoading } = useGithubUserQuery(token);

const tokenHidden = ref(true);

const { t } = i18n;
</script>

<template>
  <li class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">
        {{ t("options_privateRepos_title") }}
      </p>
      <p class="text-base">
        <em>{{ t("options_privateRepos_description1") }}</em>
        {{ t("options_privateRepos_description2") }}
        <a
          class="link link-secondary"
          href="https://github.com/settings/tokens/new?description=Github%3A%20Better%20Line%20Count&scopes=repo"
          target="_blank"
          >{{ t("options_privateRepos_description3") }}</a
        >
        {{ t("options_privateRepos_description4") }}
      </p>
    </div>
    <div class="join">
      <input
        class="join-item input input-bordered w-full"
        placeholder="Personal access token..."
        v-model="token"
        :type="tokenHidden ? 'password' : 'text'"
      />
      <div
        class="join-item btn"
        role="button"
        :class="{ 'btn-error': !tokenHidden }"
        @click="tokenHidden = !tokenHidden"
      >
        <i-mdi-eye-off-outline v-if="tokenHidden" />
        <i-mdi-eye v-else />
      </div>
    </div>

    <template v-if="token">
      <p v-if="error" class="">
        <span class="badge badge-error shrink-0">{{
          t("options_privateRepos_invalidToken")
        }}</span>
        {{ " " }}
        <span class="text-sm">{{ error }}</span>
      </p>
      <p v-else-if="isLoading || user == null" class="badge badge-ghost">
        {{ t("options_privateRepos_checking") }}
      </p>
      <p v-else class="">
        <span class="badge badge-success">{{
          t("options_privateRepos_validToken")
        }}</span>
        {{ " " }}
        <span class="text-sm">{{
          t("options_privateRepos_username", [user.login])
        }}</span>
      </p>
    </template>
  </li>
</template>

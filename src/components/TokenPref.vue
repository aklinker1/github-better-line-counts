<script lang="ts" vapor>
import IconEyeOff from "./IconEyeOff.vue";
import IconEye from "./IconEye.vue";

const token = defineModel<string>("githubPat", {
  required: true,
});

const { data: user, error, isLoading } = useGithubUserQuery(token);

const tokenHidden = ref(true);

const { t } = i18n;
</script>

<template>
  <div class="col gap-4">
    <div class="col gap-2">
      <p class="setting-title">
        {{ t("options.privateRepos.title") }}
      </p>
      <p>
        <em>{{ t("options.privateRepos.description1") }}</em>
        {{ t("options.privateRepos.description2") }}
        <a
          class="link"
          href="https://github.com/settings/tokens/new?description=Github%3A%20Better%20Line%20Count&scopes=repo"
          target="_blank"
          >{{ t("options.privateRepos.description3") }}</a
        >
        {{ t("options.privateRepos.description4") }}
      </p>
    </div>
    <div class="join">
      <input
        class="input flex-1"
        :placeholder="t('options.privateRepos.inputPlaceholder')"
        v-model="token"
        :type="tokenHidden ? 'password' : 'text'"
      />
      <button
        class="btn aspect-square p-4"
        type="button"
        :class="{ red: !tokenHidden, neutral: tokenHidden }"
        @click="tokenHidden = !tokenHidden"
      >
        <IconEyeOff v-if="tokenHidden" class="size-5" />
        <IconEye v-else class="size-5" />
      </button>
    </div>

    <template v-if="token">
      <p v-if="error">
        <span class="badge red shrink-0">{{
          t("options.privateRepos.invalidToken")
        }}</span>
        {{ " " }}
        <span class="text-sm">{{ error }}</span>
      </p>
      <p v-else-if="isLoading || user == null">
        <span class="badge neutral">{{
          t("options.privateRepos.checking")
        }}</span>
      </p>
      <p v-else>
        <span class="badge">{{ t("options.privateRepos.validToken") }}</span>
        {{ " " }}
        <span class="text-sm">{{
          t("options.privateRepos.username", [user.login])
        }}</span>
      </p>
    </template>
  </div>
</template>

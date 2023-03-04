<script lang="ts" setup>
import { getGithubApi, Github } from "../utils/github";
import { extensionStorage } from "../utils/storage";
import IMdiEye from "~icons/mdi/eye";
import IMdiEyeOffOutline from "~icons/mdi/eye-off-outline";

const api = getGithubApi();

const token = ref(await extensionStorage.getItem("githubPat"));

const {
  execute: saveToken,
  state: user,
  error,
  isLoading,
} = useAsyncState<Github.User | undefined>(
  async () => {
    await extensionStorage.setItem("githubPat", token.value);

    if (!token.value) return;
    return await api.getUser();
  },
  undefined,
  { immediate: true }
);
watch(token, () => saveToken());

const hidden = ref(true);
</script>

<template>
  <li class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <p class="font-medium text-base-content text-lg">Access Private Repos</p>
      <p class="text-base">
        <em>Optional:</em> To load the
        <code class="text-sm">.gitattributes</code> for private repos, you need
        to enter a GitHub personal access token.
        <a
          class="link link-secondary"
          href="https://github.com/settings/tokens/new?description=Github%3A%20Better%20Line%20Count&scopes=repo"
          target="_blank"
          >Click here</a
        >
        to create one.
      </p>
    </div>
    <div class="input-group input-group-sm">
      <input
        class="input input-bordered input-sm w-full"
        placeholder="Personal access token..."
        v-model="token"
        :type="hidden ? 'password' : 'text'"
      />
      <button
        class="btn btn-sm"
        :class="{ 'btn-error': !hidden }"
        @click="hidden = !hidden"
      >
        <i-mdi-eye-off-outline v-if="hidden" />
        <i-mdi-eye v-else />
      </button>
    </div>

    <template v-if="token">
      <p v-if="isLoading">Checking token...</p>
      <p v-else-if="error" class="flex items-center gap-2">
        <span class="badge badge-error">Token is invalid</span>
        <span class="text-base">{{ error }}</span>
      </p>
      <p v-else class="flex items-center gap-2">
        <span class="badge badge-success">Token is valid</span>
        <span class="text-base">Username: {{ user?.login }}</span>
      </p>
    </template>
  </li>
</template>

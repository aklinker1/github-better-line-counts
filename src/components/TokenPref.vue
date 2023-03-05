<script lang="ts" setup>
import IMdiEye from "~icons/mdi/eye";
import IMdiEyeOffOutline from "~icons/mdi/eye-off-outline";

const props = defineProps<{
  githubPat: string;
}>();

const emits = defineEmits<{
  (event: "update:githubPat", newToken: string): void;
}>();

const token = toRef(props, "githubPat");
watch(token, (newToken) => emits("update:githubPat", newToken));

const { data: user, error, isLoading } = useGithubUserQuery(token);

const tokenHidden = ref(true);
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
    <div class="input-group">
      <input
        class="input input-bordered w-full"
        placeholder="Personal access token..."
        v-model="token"
        :type="tokenHidden ? 'password' : 'text'"
      />
      <div
        class="btn"
        role="button"
        :class="{ 'btn-error': !tokenHidden }"
        @click="tokenHidden = !tokenHidden"
      >
        <i-mdi-eye-off-outline v-if="tokenHidden" />
        <i-mdi-eye v-else />
      </div>
    </div>

    <template v-if="token">
      <p v-if="error" class="flex items-center gap-2">
        <span class="badge badge-error shrink-0">Token is invalid</span>
        <span class="text-sm truncate">{{ error }}</span>
      </p>
      <p v-else-if="isLoading || user == null" class="badge badge-ghost">
        Checking token...
      </p>
      <p v-else class="flex items-center gap-2">
        <span class="badge badge-success shrink-0">Token is valid</span>
        <span class="text-sm truncate">Username: {{ user?.login }}</span>
      </p>
    </template>
  </li>
</template>

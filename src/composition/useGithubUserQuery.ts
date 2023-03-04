import { getGithubApi, Github } from "../utils/github";

export default function (token: Ref<string | null>) {
  const api = getGithubApi();

  async function getUser(): Promise<Github.User | undefined> {
    if (!token.value) return;
    return await api.getUser();
  }

  const query = useAsyncState(getUser, undefined, { immediate: true });

  watch(token, () => query.execute());
  return query;
}

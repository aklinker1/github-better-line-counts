import { Github } from "@/utils/github";

export default function (token: MaybeRefOrGetter<string | undefined>) {
  return useQuery<Github.User | undefined>({
    key: () => [QueryKeys.GithubUser, toValue(token) ?? ""],
    async query() {
      const v = toValue(token);
      return v ? await githubProxy.getUser(v) : undefined;
    },
  });
}

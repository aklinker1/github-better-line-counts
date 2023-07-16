import { getGithubService, Github } from "@/utils/github";

export default function (token: Ref<string | null>) {
  const github = getGithubService();

  return useQuery<Github.User | undefined>(
    [QueryKeys.GithubUser, token],
    () => {
      if (!token.value) return;
      return github.getUser(token.value);
    },
    {
      retry: false,
    },
  );
}

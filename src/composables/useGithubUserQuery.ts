import { getGithubService, Github } from "@/utils/github";
import { QueryKeys } from "@/utils/QueryKeys";
import { useQuery } from "@tanstack/vue-query";

export default function (token: { value: string | undefined }) {
  const github = getGithubService();

  return useQuery<Github.User | undefined>({
    queryKey: [QueryKeys.GithubUser, token],
    queryFn() {
      if (!token.value) return;
      return github.getUser(token.value);
    },
    retry: false,
  });
}

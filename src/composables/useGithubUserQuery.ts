import { Github } from "@/utils/github";

export default function (token: { value: string | undefined }) {
  return useQuery<Github.User | undefined>({
    queryKey: [QueryKeys.GithubUser, token],
    queryFn() {
      if (!token.value) return;
      return githubProxy.getUser(token.value);
    },
    retry: false,
  });
}

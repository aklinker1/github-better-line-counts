import { getGithubApi, Github } from "../utils/github";
import { QueryKeys } from "../utils/QueryKeys";

export default function (token: Ref<string | null>) {
  const api = getGithubApi();

  return useQuery<Github.User | undefined>(
    [QueryKeys.GithubUser, token],
    () => {
      if (!token.value) return;
      return api.getUser(token.value);
    },
    {
      retry: false,
    }
  );
}

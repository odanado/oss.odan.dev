import type { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

import { createCacheHandler } from "./cache";
import { formatTimeAgo } from "~/utils/format-time-ago";

const getType = (
  item: RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["response"]["data"]["items"][number],
) => {
  if (item.pull_request) {
    const suffix = item.draft
      ? "draft"
      : item.pull_request.merged_at !== null
        ? "merged"
        : item.state === "closed"
          ? "closed"
          : "open";

    return `pull-request-${suffix}` as const;
  }

  const suffix = item.state === "closed" ? "closed" : "open";

  return `issue-${suffix}` as const;
};

export async function fetchPullRequests({
  octokit,
  kv,
}: {
  octokit: Octokit;
  kv: KVNamespace;
}) {
  const cacheHandler = createCacheHandler(
    async () => {
      const lastFetched = new Date().getTime();
      const { data } = await octokit.search.issuesAndPullRequests({
        q: "author:odanado archived:false -user:odanado -user:odan-sandbox is:public is:pull-request",
      });

      const lastUpdated = new Date(data.items[0].created_at).getTime();

      const activities = data.items.map((item) => {
        const { repository_url: repositoryUrl } = item;
        const repoOwner = repositoryUrl.split("/").at(-2);
        const repoName = repositoryUrl.split("/").at(-1);
        const createdAtAgo = formatTimeAgo(item.created_at);
        const type = getType(item);

        return {
          id: item.id,
          title: item.title,
          number: item.number,
          createdAtAgo,
          type,
          link: item.html_url,
          repo: {
            owner: repoOwner ?? "",
            name: repoName ?? "",
            icon: `https://github.com/${repoOwner}.png`,
          },
        };
      });

      return {
        lastFetched,
        lastUpdated,
        activities,
      };
    },
    {
      key: "pull-requests-v2",
      kv,
      ttlSeconds: 60,
    },
  );

  const { activities, lastFetched, lastUpdated } = await cacheHandler();

  return {
    activities,
    lastFetched,
    lastUpdated,
  };
}

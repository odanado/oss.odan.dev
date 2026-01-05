import type { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { parseISO } from "date-fns";

import { formatTimeAgo } from "../utils/format-time-ago";

type Activity = ReturnType<typeof convertToActivity>;

export type Contributions = {
  lastFetched: number;
  lastUpdated: number;
  pullRequests: Activity[];
  issues: Activity[];
};

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

const convertToActivity = (
  item: RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["response"]["data"]["items"][number],
) => {
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
    createdAt: parseISO(item.created_at),
    type,
    link: item.html_url,
    repo: {
      owner: repoOwner ?? "",
      name: repoName ?? "",
      icon: `https://github.com/${repoOwner}.png`,
    },
  };
};

const fetchIssuesOrPullRequests = async ({
  query,
  octokit,
}: {
  query: string;
  octokit: Octokit;
}) => {
  const { data } = await octokit.search.issuesAndPullRequests({
    q:
      "author:odanado archived:false -user:odanado -user:odan-sandbox is:public " +
      query,
  });
  return data.items.map(convertToActivity);
};

export async function fetchContributions({
  octokit,
}: {
  octokit: Octokit;
}): Promise<Contributions> {
  const lastFetched = new Date().getTime();

  const pullRequests = await fetchIssuesOrPullRequests({
    query: "is:pr",
    octokit,
  });
  const issues = await fetchIssuesOrPullRequests({
    query: "is:issue",
    octokit,
  });

  const lastUpdated = Math.max(
    pullRequests[0].createdAt.getTime(),
    issues[0].createdAt.getTime(),
  );

  return {
    lastFetched,
    lastUpdated,
    pullRequests,
    issues,
  };
}

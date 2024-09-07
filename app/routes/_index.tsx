import type { MetaFunction } from "@remix-run/node";
import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";
import { useLoaderData } from "@remix-run/react";
import { parseISO, formatDistance } from "date-fns";
import { config } from "~/config";
import { ContributionActivity } from "~/components/ContributionActivity";

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

export const loader = async () => {
  const octokit = new Octokit({
    auth: config.githubToken,
  });

  const { data } = await octokit.search.issuesAndPullRequests({
    q: "author:odanado archived:false -user:odanado -user:odan-sandbox is:public ",
  });

  const now = new Date();

  return {
    items: data.items.map((item) => {
      const { repository_url: repositoryUrl } = item;
      const repoOwner = repositoryUrl.split("/").at(-2);
      const repoName = repositoryUrl.split("/").at(-1);
      const createdAtAgo = formatDistance(parseISO(item.created_at), now, {
        addSuffix: true,
      });
      const type = getType(item);

      return {
        id: item.id,
        title: item.title,
        number: item.number,
        createdAtAgo,
        type,
        repo: {
          owner: repoOwner ?? "",
          name: repoName ?? "",
          icon: `https://github.com/${repoOwner}.png`,
        },
      };
    }),
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { items } = data;

  return (
    <div className="font-sans p-4">
      {items.map((item) => {
        return (
          <ContributionActivity
            key={item.id}
            title={item.title}
            type={item.type}
            repo={item.repo}
            number={item.number}
            createdAtAgo={item.createdAtAgo}
          />
        );
      })}
    </div>
  );
}

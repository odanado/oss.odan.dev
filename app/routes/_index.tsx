import type { MetaFunction } from "@remix-run/node";
import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";
import { useLoaderData } from "@remix-run/react";
import { parseISO, formatDistance } from "date-fns";
import { config } from "~/config";
import { ContributionActivity } from "~/components/ContributionActivity";
import { Hero } from "~/components/Hero";

import { styled } from "~/styled-system/jsx";

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
        link: item.html_url,
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
    <styled.main
      maxWidth="4xl"
      marginX="auto"
      position="relative"
      paddingX={{ base: 4, md: 6, lg: 8 }}
      pt="10"
    >
      <styled.div display="flex" flexDirection="column" gap={10}>
        <Hero />
        <styled.div display="flex" flexDirection="column" gap={6}>
          {items.map((item) => {
            return (
              <ContributionActivity
                key={item.id}
                title={item.title}
                type={item.type}
                repo={item.repo}
                number={item.number}
                link={item.link}
                createdAtAgo={item.createdAtAgo}
              />
            );
          })}
        </styled.div>
      </styled.div>
    </styled.main>
  );
}

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Octokit } from "@octokit/rest";
import { useLoaderData } from "@remix-run/react";
import { ContributionActivity } from "~/components/ContributionActivity";
import { Hero } from "~/components/Hero";

import { styled } from "~/styled-system/jsx";
import { fetchPullRequests } from "~/api/github";
import { Footer } from "~/components/Footer";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const githubToken = context.cloudflare.env.GITHUB_TOKEN;

  console.log("githubToken is defined", githubToken !== undefined);

  const octokit = new Octokit({
    auth: githubToken,
  });

  const { activities, lastFetched, lastUpdated } = await fetchPullRequests({
    octokit,
    kv: context.cloudflare.env.cache,
  });

  return {
    items: activities,
    lastFetched,
    lastUpdated,
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
  const { items, lastFetched, lastUpdated } = data;

  return (
    <styled.div
      display="flex"
      flexDir="column"
      gap="10"
      alignItems="center"
      maxWidth="4xl"
      marginX="auto"
      position="relative"
      px={{ base: 4, md: 6, lg: 8 }}
      py="10"
    >
      <styled.main>
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
      <Footer lastFetched={lastFetched} lastUpdated={lastUpdated} />
    </styled.div>
  );
}

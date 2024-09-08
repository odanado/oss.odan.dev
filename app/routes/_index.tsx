import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Octokit } from "@octokit/rest";
import { useLoaderData, useSearchParams } from "@remix-run/react";

import { ContributionActivity } from "~/components/ContributionActivity";
import { Hero } from "~/components/Hero";
import { styled } from "~/styled-system/jsx";
import { fetchIssues, fetchPullRequests } from "~/api/github";
import { Footer } from "~/components/Footer";
import { ActivityTabs, ActivityTabsContent } from "~/components/ActivityTabs";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const githubToken = context.cloudflare.env.GITHUB_TOKEN;

  console.log("githubToken is defined", githubToken !== undefined);

  const octokit = new Octokit({
    auth: githubToken,
  });

  const pullRequestData = await fetchPullRequests({
    octokit,
    kv: context.cloudflare.env.cache,
  });

  const issueData = await fetchIssues({
    octokit,
    kv: context.cloudflare.env.cache,
  });

  return {
    pullRequestData,
    issueData,
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "odan is Contributing" },
    {
      name: "description",
      content: "@odanado's recent issues and pull requests on GitHub",
    },
  ];
};

export default function Index() {
  const { pullRequestData, issueData } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentActivity = searchParams.get("activity") ?? "issues";

  const lastFetched =
    currentActivity === "pull-requests"
      ? pullRequestData.lastFetched
      : issueData.lastFetched;
  const lastUpdated =
    currentActivity === "pull-requests"
      ? pullRequestData.lastUpdated
      : issueData.lastUpdated;

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
      <styled.main display="flex" flexDirection="column" gap={10} w="full">
        <Hero />
        <ActivityTabs
          defaultValue={currentActivity}
          onValueChange={(value) => {
            setSearchParams({ activity: value });
          }}
        >
          <ActivityTabsContent value="issues">
            <styled.div display="flex" flexDirection="column" gap={6}>
              {issueData.activities.map((activity) => {
                return (
                  <ContributionActivity
                    key={activity.id}
                    title={activity.title}
                    type={activity.type}
                    repo={activity.repo}
                    number={activity.number}
                    link={activity.link}
                    createdAtAgo={activity.createdAtAgo}
                  />
                );
              })}
            </styled.div>
          </ActivityTabsContent>
          <ActivityTabsContent value="pull-requests">
            <styled.div display="flex" flexDirection="column" gap={6}>
              {pullRequestData.activities.map((activity) => {
                return (
                  <ContributionActivity
                    key={activity.id}
                    title={activity.title}
                    type={activity.type}
                    repo={activity.repo}
                    number={activity.number}
                    link={activity.link}
                    createdAtAgo={activity.createdAtAgo}
                  />
                );
              })}
            </styled.div>
          </ActivityTabsContent>
        </ActivityTabs>
      </styled.main>
      <Footer lastFetched={lastFetched} lastUpdated={lastUpdated} />
    </styled.div>
  );
}

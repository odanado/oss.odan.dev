import { useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";

import { ContributionActivity } from "./ContributionActivity";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { ActivityTabs, ActivityTabsContent } from "./ActivityTabs";

import { styled } from "../styled-system/jsx";
import type { Contributions } from "../lib/github";

export const Root = ({ contributions }: { contributions: Contributions }) => {
  return (
    <NuqsAdapter>
      <RootContent contributions={contributions} />
    </NuqsAdapter>
  );
};

export const RootContent = ({
  contributions,
}: {
  contributions: Contributions;
}) => {
  const [activity, setActivity] = useQueryState("activity", {
    defaultValue: "issues",
  });

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
          defaultValue={activity}
          onValueChange={(value) => {
            setActivity(value);
          }}
        >
          <ActivityTabsContent value="issues">
            <styled.div display="flex" flexDirection="column" gap={6}>
              {contributions.issues.map((activity) => {
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
              {contributions.pullRequests.map((activity) => {
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
      <Footer
        lastFetched={contributions.lastFetched}
        lastUpdated={contributions.lastUpdated}
      />
    </styled.div>
  );
};

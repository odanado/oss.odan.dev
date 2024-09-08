import { Tabs } from "@ark-ui/react";
import { styled } from "~/styled-system/jsx";

import OcticonIssueOpened16 from "~icons/octicon/issue-opened-16";
import OcticonGitPullRequest16 from "~icons/octicon/git-pull-request-16";

const TabsTrigger = styled(Tabs.Trigger, {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    cursor: "pointer",
    color: "gray.500",
    backgroundColor: "gray.200",
    borderRadius: "md",
    py: 1,
    px: 2,
    _hover: {
      backgroundColor: "gray.100",
    },
    _selected: {
      fontWeight: "bold",
      color: "black",
    },
  },
});

const TabsRoot = styled(Tabs.Root);
const TabsList = styled(Tabs.List);

type Props = {
  children: React.ReactNode;
  defaultValue: string;
  onValueChange: (value: "issues" | "pull-requests") => void;
};

export const ActivityTabs = ({
  children,
  defaultValue,
  onValueChange,
}: Props) => {
  const handleValueChange = ({ value }: { value: string }) => {
    if (value === "issues" || value === "pull-requests") {
      onValueChange(value);
    }
  };
  return (
    <TabsRoot
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      display="flex"
      flexDir="column"
      gap="4"
    >
      <TabsList display="flex" gap="2" justifyContent="center">
        <TabsTrigger value="issues">
          <OcticonIssueOpened16 />
          Issues
        </TabsTrigger>
        <TabsTrigger value="pull-requests">
          <OcticonGitPullRequest16 />
          Pull Requests
        </TabsTrigger>
      </TabsList>
      {children}
    </TabsRoot>
  );
};

export const ActivityTabsContent = styled(Tabs.Content);

import { styled } from "~/styled-system/jsx";
import { cva } from "~/styled-system/css";

import OcticonIssueClosed16 from "~icons/octicon/issue-closed-16";
import OcticonIssueOpened16 from "~icons/octicon/issue-opened-16";
import OcticonGitPullRequest16 from "~icons/octicon/git-pull-request-16";
import OcticonGitPullRequestClosed16 from "~icons/octicon/git-pull-request-closed-16";
import OcticonGitPullRequestDraft16 from "~icons/octicon/git-pull-request-draft-16";

type Props = {
  type:
    | "issue-open"
    | "issue-closed"
    | "pull-request-open"
    | "pull-request-closed"
    | "pull-request-merged"
    | "pull-request-draft";
};

const getIcon = (type: Props["type"]) => {
  switch (type) {
    case "issue-open":
      return <OcticonIssueOpened16 />;
    case "issue-closed":
      return <OcticonIssueClosed16 />;
    case "pull-request-open":
      return <OcticonGitPullRequest16 />;
    case "pull-request-closed":
      return <OcticonGitPullRequestClosed16 />;
    case "pull-request-merged":
      return <OcticonGitPullRequest16 />;
    case "pull-request-draft":
      return <OcticonGitPullRequestDraft16 />;
  }
};

// > We recommend that you avoid relying on runtime values for your styles . Consider using recipes, css variables or data-* attributes instead.
// > https://panda-css.com/docs/guides/dynamic-styling
const icon = cva({
  base: {
    fontSize: "sm",
  },
  variants: {
    type: {
      "issue-open": {
        color: "github-open",
      },
      "issue-closed": {
        color: "github-done",
      },
      "pull-request-open": {
        color: "github-open",
      },
      "pull-request-closed": {
        color: "github-closed",
      },
      "pull-request-merged": {
        color: "github-done",
      },
      "pull-request-draft": {
        color: "github-muted",
      },
    },
  },
});

const IconSpan = styled("span", icon);

export const ContributionIcon = ({ type }: Props) => {
  return (
    <IconSpan fontSize="sm" type={type}>
      {getIcon(type)}
    </IconSpan>
  );
};

import type { Meta, StoryObj } from "@storybook/react";
import { ContributionIcon } from "./ContributionIcon";

const meta = {
  title: "ContributionIcon",
  component: ContributionIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContributionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IssueOpen: Story = {
  args: {
    type: "issue-open",
  },
};

export const IssueClosed: Story = {
  args: {
    type: "issue-closed",
  },
};

export const PullRequestOpen: Story = {
  args: {
    type: "pull-request-open",
  },
};

export const PullRequestClosed: Story = {
  args: {
    type: "pull-request-closed",
  },
};

export const PullRequestMerged: Story = {
  args: {
    type: "pull-request-merged",
  },
};

export const PullRequestDraft: Story = {
  args: {
    type: "pull-request-draft",
  },
};

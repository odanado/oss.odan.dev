import type { Meta, StoryObj } from "@storybook/react";
import { ActivityTabs } from "./ActivityTabs";

const meta = {
  title: "ActivityTabs",
  component: ActivityTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Issues: Story = {
  args: {
    children: "Tab Content",
    defaultValue: "issues",
    onValueChange: () => {},
  },
};

export const PullRequests: Story = {
  args: {
    children: "Tab Content",
    defaultValue: "pull-requests",
    onValueChange: () => {},
  },
};

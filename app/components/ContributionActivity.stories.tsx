import type { Meta, StoryObj } from "@storybook/react";
import { ContributionActivity } from "./ContributionActivity";
import { smallMobile, largeMobile, tablet } from "../../.storybook/storycap";

const meta = {
  title: "ContributionActivity",
  component: ContributionActivity,
  parameters: {
    screenshot: {
      variants: {
        ...smallMobile,
        ...largeMobile,
        ...tablet,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContributionActivity>;

export default meta;
type Story = StoryObj<typeof meta>;

const icon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAbklEQVR4nOzQMQ2AQBQEUUK+BDxQfjNgB200dDT4oTgJ02xxxTwBm8nWt/9Lwn11ZGeNrAQZRAwiBhGDiEHEIGIQMYgYRAwiBpF6+o0MHecW2ZnuIYOIQcQgYhAxiBhEDCIGEYOIQcQgMgIAAP//sgkGQ+MLh8AAAAAASUVORK5CYII=";

export const Default: Story = {
  args: {
    title: "issue or pull request title",
    repo: {
      owner: "owner",
      name: "repo",
      icon,
    },
    createdAtAgo: "1 day ago",
    type: "issue-open",
    number: 1,
    link: "#",
  },
};

export const AlmostThreeYearsAgo: Story = {
  args: {
    title: "issue or pull request title",
    repo: {
      owner: "owner",
      name: "repo",
      icon,
    },
    createdAtAgo: "almost 3 years ago",
    type: "issue-open",
    number: 1,
    link: "#",
  },
};

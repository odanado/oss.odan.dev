import type { Meta, StoryObj } from "@storybook/react";
import { ExternalLink } from "./ExternalLink";

const meta = {
  title: "ExternalLink",
  component: ExternalLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ExternalLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Link Text",
  },
};

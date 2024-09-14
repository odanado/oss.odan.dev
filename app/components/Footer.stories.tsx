import type { Meta, StoryObj } from "@storybook/react";
import { parseISO } from "date-fns";
import { Footer } from "./Footer";

const meta = {
  title: "Footer",
  component: Footer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lastFetched: parseISO("2024-09-01 12:00:00").getTime(),
    lastUpdated: parseISO("2024-09-01 00:00:00").getTime(),
    _now: parseISO("2024-09-01 15:00:00"),
  },
};

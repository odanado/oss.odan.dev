import type { Meta, StoryObj } from "@storybook/react";
import { parseISO } from "date-fns";
import { TimeAgo } from "./TimeAgo";

const meta = {
  title: "TimeAgo",
  component: TimeAgo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimeAgo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Now: Story = {
  args: {
    date: parseISO("2024-09-01 12:00:00"),
    _now: parseISO("2024-09-01 12:00:00"),
  },
};

export const OneDayAgo: Story = {
  args: {
    date: parseISO("2024-09-01 12:00:00"),
    _now: parseISO("2024-09-02 12:00:00"),
  },
};

export const SevenDaysAgo: Story = {
  args: {
    date: parseISO("2024-09-01 12:00:00"),
    _now: parseISO("2024-09-08 12:00:00"),
  },
};

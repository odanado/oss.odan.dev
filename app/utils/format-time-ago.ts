import { formatDistance, parseISO } from "date-fns";

export function formatTimeAgo(date: Date | string | number): string {
  const now = new Date();

  const _date =
    typeof date === "string"
      ? parseISO(date)
      : typeof date === "number"
        ? new Date(date)
        : date;

  return formatDistance(_date, now, {
    addSuffix: true,
  });
}

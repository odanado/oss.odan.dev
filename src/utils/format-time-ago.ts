import { formatDistance, parseISO } from "date-fns";

export function formatTimeAgo(
  date: Date | string | number,
  options?: { now?: Date },
): string {
  const now = options?.now ?? new Date();

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

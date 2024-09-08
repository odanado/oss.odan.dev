import { parseISO } from "date-fns";
import { styled } from "~/styled-system/jsx";
import { formatTimeAgo } from "~/utils/format-time-ago";

const _TimeAge = ({ date }: { date: Date | string | number }) => {
  const _date =
    typeof date === "string"
      ? parseISO(date)
      : typeof date === "number"
        ? new Date(date)
        : date;
  return (
    <styled.time dateTime={_date.toISOString()}>
      {formatTimeAgo(date)}
    </styled.time>
  );
};

// TODO: not working
export const TimeAgo = styled(_TimeAge);

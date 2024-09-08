import { parseISO } from "date-fns";
import { styled } from "~/styled-system/jsx";
import { formatTimeAgo } from "~/utils/format-time-ago";

const UnstyledTimeAge = ({ date }: { date: Date | string | number }) => {
  const _date =
    typeof date === "string"
      ? parseISO(date)
      : typeof date === "number"
        ? new Date(date)
        : date;

  return (
    <styled.time dateTime={_date.toISOString()} color="gray.800">
      {formatTimeAgo(date)}
    </styled.time>
  );
};

// TODO: not working
export const TimeAgo = styled(UnstyledTimeAge);

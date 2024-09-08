import { styled } from "~/styled-system/jsx";
import { TimeAgo } from "./TimeAgo";

type Props = {
  lastFetched: number;
  lastUpdated: number;
};

export const Footer = ({ lastFetched, lastUpdated }: Props) => {
  return (
    <styled.footer display="flex" flexDir="column" alignItems="center">
      <styled.div display="flex" gap="1">
        <styled.span color="gray.500">Last activity</styled.span>
        <TimeAgo date={lastUpdated} color="gray.700" />
        <styled.span mx="2">|</styled.span>
        <styled.span color="gray.500">Last fetched</styled.span>
        <TimeAgo date={lastFetched} color="gray.700" />
      </styled.div>
    </styled.footer>
  );
};

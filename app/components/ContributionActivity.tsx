import { ComponentProps } from "react";

import { styled } from "~/styled-system/jsx";
import { ContributionIcon } from "~/components/ContributionIcon";
import { ExternalLink } from "./ExternalLink";

type Props = {
  title: string;
  repo: {
    owner: string;
    name: string;
    icon: string;
  };
  createdAtAgo: string;
  number: number;
  link: string;
  type: ComponentProps<typeof ContributionIcon>["type"];
};

export const ContributionActivity = ({
  title,
  repo,
  number,
  type,
  link,
  createdAtAgo,
}: Props) => {
  return (
    <styled.div display="flex" gap={3}>
      <styled.img
        src={repo.icon}
        alt="repo icon"
        width={12}
        height={12}
        borderRadius="full"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.200"
      />
      <styled.div display="flex" gap={2} flex="auto">
        <styled.div display="flex" flexDirection="column" flex="auto">
          <styled.div display="flex" alignItems="center" gap={1}>
            <ContributionIcon type={type} />
            <ExternalLink href={link}>
              <styled.span fontSize="md" fontWeight="bold" lineClamp="1">
                {title}
              </styled.span>
            </ExternalLink>
          </styled.div>

          <ExternalLink href={link}>
            <styled.span fontSize="sm" color="gray.500">
              {repo.owner}/{repo.name}#{number}
            </styled.span>
          </ExternalLink>
        </styled.div>
        <styled.div flexBasis="120px" flexShrink="0" textAlign="end">
          <styled.span fontSize="sm" color="gray.500">
            {createdAtAgo}
          </styled.span>
        </styled.div>
      </styled.div>
    </styled.div>
  );
};

import { ComponentProps } from "react";

import { styled } from "~/styled-system/jsx";
import { ContributionIcon } from "~/components/ContributionIcon";

type Props = {
  title: string;
  repo: {
    owner: string;
    name: string;
    icon: string;
  };
  createdAtAgo: string;
  number: number;
  type: ComponentProps<typeof ContributionIcon>["type"];
};

export const ContributionActivity = ({
  title,
  repo,
  number,
  type,
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
      />
      <styled.div display="flex" gap={2}>
        <styled.div display="flex" flexDirection="column">
          <styled.div display="flex" alignItems="center" gap={1}>
            <ContributionIcon type={type} />
            <styled.span fontSize="md" fontWeight="bold">
              {title}
            </styled.span>
          </styled.div>

          <styled.span fontSize="sm" color="gray.500">
            {repo.owner}/{repo.name}#{number}
          </styled.span>
        </styled.div>
        <styled.div>
          <styled.span fontSize="sm" color="gray.500">
            {createdAtAgo}
          </styled.span>
        </styled.div>
      </styled.div>
    </styled.div>
  );
};

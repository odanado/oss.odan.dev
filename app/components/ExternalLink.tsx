import { styled } from "~/styled-system/jsx";

type Props = {
  href: string;
  children: React.ReactNode;
};

export const ExternalLink = ({ href, children }: Props) => {
  return (
    <styled.a
      href={href}
      target="_blank"
      rel="noreferrer"
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </styled.a>
  );
};

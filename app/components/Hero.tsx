import { styled } from "~/styled-system/jsx";

export const Hero = () => {
  return (
    <styled.div
      display="flex"
      flexDir="column"
      justifyItems="center"
      alignItems="center"
    >
      <styled.img
        src="https://odan.dev/icon.jpeg"
        alt="a icon of odan"
        width={20}
        height={20}
        borderRadius="full"
      />
      <styled.div
        display="flex"
        flexDir="column"
        justifyItems="center"
        alignItems="center"
      >
        <styled.h1 fontSize="3xl">odan is Contributing...</styled.h1>
        <styled.p fontSize="lg" color="gray.500">
          <styled.a
            href="https://github.com/odanado"
            target="_blank"
            rel="noreferrer"
            _hover={{ textDecoration: "underline" }}
          >
            @odanado&apos;s recent issues and pull requests on GitHub
          </styled.a>
        </styled.p>
      </styled.div>
    </styled.div>
  );
};

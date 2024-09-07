import * as v from "valibot";

const EnvSchema = v.object({
  githubToken: v.string(),
});

export const config = v.parse(EnvSchema, {
  githubToken: process.env.GITHUB_TOKEN,
});

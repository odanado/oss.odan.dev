import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          "github-open": { value: "#1a7f37" },
          "github-closed": { value: "#d1242f" },
          "github-done": { value: "#8250df" },
          "github-muted": { value: "#59636e" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "app/styled-system",
  jsxFramework: "react",
});

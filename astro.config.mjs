// @ts-check

import react from "@astrojs/react";
import { defineConfig } from "astro/config";

import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [react()],
  vite: {
    plugins: [Icons({ compiler: "jsx", jsx: "react" })],
  },
});

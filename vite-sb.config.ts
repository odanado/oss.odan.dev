import { defineConfig, loadEnv } from "vite";
import Icons from "unplugin-icons/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };
  return {
    plugins: [Icons({ compiler: "jsx", jsx: "react" })],
  };
});

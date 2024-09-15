import type { Preview } from "@storybook/react";
import { withScreenshot, type ScreenshotOptions } from "storycap";
import { desktop } from "./storycap";

import "../app/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [withScreenshot];

export const parameters = {
  screenshot: {
    viewport: desktop.desktop.viewport,
  } satisfies ScreenshotOptions,
};

export default preview;

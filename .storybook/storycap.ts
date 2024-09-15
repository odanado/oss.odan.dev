import { ScreenshotOptions } from "storycap";

export const smallMobile: ScreenshotOptions["variants"] = {
  smallMobile: {
    viewport: "iPhone 5",
  },
};

export const largeMobile: ScreenshotOptions["variants"] = {
  largeMobile: {
    viewport: "iPhone 11 Pro Max",
  },
};

export const tablet: ScreenshotOptions["variants"] = {
  tablet: {
    viewport: "iPad Pro 11 landscape",
  },
};

export const desktop = {
  desktop: {
    viewport: {
      width: 1280,
      height: 800,
      isMobile: false,
    },
  },
} satisfies ScreenshotOptions["variants"];

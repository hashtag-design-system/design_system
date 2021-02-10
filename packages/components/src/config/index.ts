import { listKeys } from "./lists";
import { breakpoints } from "./styles";
import { default as ERRORS } from "./errors";
import { storybookTitles } from "./storybook";
import { CLOUDFRONT_URL } from "./aws";
import { DEFAULT_PORTAL_ID_SELECTOR } from "./provider";
export * from "./provider";

const iconPositions = ["left", "right"] as const;

export const CONFIG = {
  listKeys,
  breakpoints,
  storybookTitles,
  ERRORS,
  iconPositions,
  CLOUDFRONT_URL,
  DEFAULT_PORTAL_ID_SELECTOR,
}
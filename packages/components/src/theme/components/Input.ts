import { ComponentStyleConfig } from "@chakra-ui/react";

const SIZES = { lg: { h: 14 }, md: { h: 12 }, sm: { h: 10 }, xs: { h: 8 } } as const;

const InputSizes = {
  lg: {
    addon: { ...SIZES.lg },
    field: { ...SIZES.lg, paddingTop: 1.5 },
  },
  md: {
    addon: { ...SIZES.md },
    field: { ...SIZES.md, paddingTop: 1.5 },
  },
  sm: {
    addon: { ...SIZES.sm },
    field: { ...SIZES.sm, paddingTop: 1.5 },
  },
  xs: {
    addon: { ...SIZES.xs },
    field: { ...SIZES.xs, paddingTop: 2 },
  },
};

export const Input: ComponentStyleConfig = {
  // does not work
  // baseStyle: {
  //   field: {
  //     borderRadius: "md",
  //   },
  // },
  sizes: InputSizes,
  variants: {
    outline: {
      field: {
        borderRadius: "lg",
      },
    },
    filled: {
      field: {
        borderRadius: "lg",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};

export const NumberInput: ComponentStyleConfig = {
  sizes: InputSizes,
  variants: {
    outline: { ...Input.variants?.outline["field"] },
    filled: { ...Input.variants?.filled["field"] },
  },
  defaultProps: {
    ...Input.defaultProps,
  },
};

export const Textarea: ComponentStyleConfig = {
  baseStyle: {
    paddingY: 4,
  },
  sizes: {
    // lg: { ...SIZES.lg, paddingTop: 1.5 },
    // md: { ...SIZES.md, paddingTop: 1.5 },
    // sm: { ...SIZES.sm, paddingTop: 1.5 },
    // xs: { ...SIZES.xs, paddingTop: 2 },
  },
  variants: {
    outline: { ...Input.variants?.outline["field"] },
    filled: { ...Input.variants?.filled["field"] },
  },
  defaultProps: {
    ...Input.defaultProps,
  },
};

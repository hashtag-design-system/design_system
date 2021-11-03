import React from "react";
import { SelectionInputLabelType } from "./SelectionInput/LabelContainer";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
// React.ComponentPropsWithoutRef<"input">["autoComplete"]
// Make sure to update, if values are changed for the browsers
const InputAutocompleteTypes = [
  "on",
  "off",
  "current-password",
  "new-password",
  "name",
  "honorific-prefix",
  "given-name",
  "additional-name",
  "family-name",
  "honorific-suffix",
  "nickname",
  "email",
  "username",
  "one-time-code",
  "organization-title",
  "organization",
  "street-address",
  "address-line1",
  "address-line2",
  "address-line3",
  "address-level1",
  "address-level2",
  "address-level3",
  "address-level4",
  "county",
  "country-name",
  "postal-code",
  "cc-name",
  "cc-given-name",
  "cc-additional-name",
  "cc-family-name",
  "cc-number",
  "cc-exp",
  "cc-exp-month",
  "cc-exp-year",
  "cc-csc",
  "cc-type",
  "transaction-currency",
  "transaction-amount",
  "language",
  "bday",
  "bday-day",
  "bday-month",
  "bday-year",
  "sex",
  "tel",
  "tel-country-code",
  "tel-national",
  "tel-area-code",
  "tel-local",
  "tel-extension",
  "impp",
  "url",
  "photo",
] as const;
export type InputAutocompleteType = typeof InputAutocompleteTypes[number];

const InputTypes = [
  "tel",
  "text",
  "textarea",
  "email",
  "file",
  "hidden",
  "number",
  "password",
  "checkbox",
  "radio",
  "range",
  "search",
  "button",
  "url",
] as const;
export type InputType = typeof InputTypes[number];

export type SelectionInputProps = {
  defaultChecked?: boolean;
  label?: SelectionInputLabelType["value"] | SelectionInputLabelType;
  groupName?: string;
  incheck?: (isChecked: boolean) => void;
};

export type ComponentProps<
  T extends React.ElementType<any>,
  R extends boolean | undefined = undefined,
  S extends string | undefined = undefined
> = (R extends false | undefined
  ? Omit<React.ComponentPropsWithoutRef<T>, "defaultValue">
  : Omit<React.ComponentPropsWithRef<T>, "defaultValue">) &
  (S extends undefined
    ? {}
    : {
        state?: S;
      });

export type ComponentState<T extends string> = {
  state?: T;
};

export type ComponentLoading<isUndefined extends boolean = true> = isUndefined extends true
  ? {
      loading?: boolean;
    }
  : {
      loading: boolean;
    };

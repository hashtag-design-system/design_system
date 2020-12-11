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
  "transcation-amount",
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

const InputTypes = ["text", "email", "hidden", "number", "password", "checkbox", "radio", "range", "search", "button", "url"] as const;
export type InputType = typeof InputTypes[number];

type BaseInput<S extends string | undefined = undefined, Ref extends boolean = false, T extends React.ElementType = "input"> = {
  value?: React.ReactText;
  type?: InputType;
  defaultValue?: React.ReactText;
  allowTyping?: boolean;
  autoComplete?: InputAutocompleteType;
  onSelect?: (e: React.MouseEvent<HTMLLIElement>, key: string) => void;
} & Omit<Ref extends false ? React.ComponentPropsWithoutRef<T> : React.ComponentPropsWithRef<T>, "value" | "type" | "onSelect"> &
  (S extends undefined ? {} : { state?: S });

type Input<S extends string | undefined = undefined, Ref extends boolean = false, T extends React.ElementType = "input"> = Omit<
  BaseInput<S, Ref, T>,
  "value"
>;

type NumberInput<S extends string | undefined = undefined, Ref extends boolean = false> = {
  min?: number;
  max?: number;
  count?: number;
  step?: number;
} & Omit<Input<S, Ref>, "min" | "max" | "step">;

type InputStateObjType<S extends string | undefined> = S extends undefined ? {} : { state?: S };

export type ReactProps<
  State extends string | undefined = undefined,
  HasRef extends boolean = false,
  ElementType extends React.ElementType = "input"
> = {
  input: Input<State, HasRef, ElementType>;
  base_input: BaseInput<State, HasRef, ElementType>;
  number_input: NumberInput<State, HasRef>;
  inner_ref: { innerRef?: React.ComponentPropsWithRef<ElementType>["ref"] };
  input_state_prop: InputStateObjType<State>;
};

// ------------------------------- //
export type SelectionInputProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string | SelectionInputLabelType;
  groupName?: string;
};

type BaseInput<T> = {
  value?: React.ReactText;
  defaultValue?: React.ReactText;
  allowTyping?: boolean;
  inchange?: (value: React.ReactText, e: React.ChangeEvent<T>) => void;
  inselect?: (key: string, e: React.SyntheticEvent<HTMLLIElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "type">;

type Input<T> = Omit<BaseInput<T>, "value">;

export type ReactProps<T = HTMLInputElement, S = string> = {
  input: Input<T>;
  base_input: BaseInput<T>;
  // https://stackoverflow.com/questions/56282461/enforcing-object-keys-from-in-typescript
  input_state_obj: { state?: S };
};

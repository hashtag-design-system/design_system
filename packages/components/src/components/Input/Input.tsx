import React from "react";
import { IconPropType } from "../../typings";
import { InputContextProvider } from "../../utils/contexts";
import { generateInputId } from "../../utils/hooks/useInputId";
import { InputAutocompleteType } from "../__helpers__";
import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import IncrDcr from "./IncrDcr";
import { InputBaseFProps } from "./index";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";
import { Base, FieldContainer, InputContainer } from "./__helpers__";

const InputBaseStates = ["default", "focus", "disabled"] as const;
export type InputBaseState = typeof InputBaseStates[number];

export const InputStates = [...InputBaseStates, "hover", "error", "success"] as const;
export type InputState = typeof InputStates[number];

export type InputHelpTextType = {
  value: string;
  icon?: IconPropType;
  error?: boolean;
  transparent?: boolean;
};

type State = {
  id: FProps["id"];
  value: FProps["value"];
};

export type Props = {
  defaultValue?: React.ReactText;
  helptext?: InputHelpTextType;
  secondhelptext?: InputHelpTextType;
  characterLimit?: boolean;
  floatingplaceholder?: boolean | { now: boolean };
  label?: string;
  allowClear?: boolean;
  autoComplete?: InputAutocompleteType;
  optional?: boolean;
  forwardref?: React.ComponentPropsWithRef<"input">["ref"];
  passwordboxes?: React.ReactNode;
};

export type FProps = Props & InputBaseFProps<InputState>;

export type SBProps = Omit<Props, "passwordboxes"> &
  Pick<FProps, "placeholder" | "state" | "allowClear" | "suffix" | "prefix" | "type" | "maxLength">;

export default class Input extends React.Component<FProps, State> {
  static Base: typeof Base;

  static Password: typeof Password;

  static Multiline: typeof Multiline;

  static Digit: typeof Digit;

  static DigitSequence: typeof DigitSequence;

  static Number: typeof Number;

  static IncrDcr: typeof IncrDcr;

  static displayName = "Input";

  state: State = {
    id: this.props.id || "",
    value: this.props.value || this.props.defaultValue || "",
  };

  componentDidMount = () => {
    if (!this.state.id) {
      this.setState(prevState => ({
        ...prevState,
        id: generateInputId(),
      }));
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // `overrideOnChange` Prop is being handle by the <Base /> helper component
    const { onChange } = this.props;

    this.setState({ value: e.target.value });

    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const { id, value } = this.state;

    const { value: propsValue, overrideOnChange } = this.props;
    // console.log(id);

    return (
      <InputContextProvider
        value={{
          ...this.props,
          id,
          value: overrideOnChange && propsValue !== undefined ? propsValue : value,
          onChange: overrideOnChange ? this.props.onChange : this.handleChange,
          overrideOnChange,
        }}
      >
        <InputContainer>
          <FieldContainer />
        </InputContainer>
      </InputContextProvider>
    );
  }
}

// 6 (+1 <Base /> helper) sub-components in total
// ! Always add sub-components after declaration inside the component
Input.Base = Base;
Input.Password = Password;
Input.Multiline = Multiline;
Input.Digit = Digit;
Input.DigitSequence = DigitSequence;
Input.Number = Number;
Input.IncrDcr = IncrDcr;

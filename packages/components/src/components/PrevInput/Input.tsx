import React from "react";
import { ReactProps } from "../__helpers__";
import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import IncrDcr from "./IncrDcr";
import { InputBaseFProps } from "./index";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";
import FieldContainer from "./__helpers__/FieldContainer";
import BaseInput from "./__helpers__/BaseInput";
import HelpTextContainer from "./__helpers__/HelpTextContainer";

// React allows custom Props to be passed only when they are spelled in lowercase
export type Props = {
  helptext?: { value: string; icon?: React.ReactNode };
  secondhelptext?: { value: string; icon?: React.ReactNode };
  characterLimit?: boolean;
};

export type FProps = Props & InputBaseFProps & ReactProps["inner_ref"];

type State = {
  id: string;
  value: FProps["value"];
  isActive: boolean;
};

export default class Input extends React.Component<FProps, State> {
  public static BaseField: typeof FieldContainer;

  public static BaseInput: typeof BaseInput;

  public static Multiline: typeof Multiline;

  public static Number: typeof Number;

  public static Password: typeof Password;

  public static Digit: typeof Digit;

  public static DigitSequence: typeof DigitSequence;

  public static IncrDcr: typeof IncrDcr;

  static displayName = "Input";

  state: State = {
    id: this.props.id || "",
    value: this.props.value || "",
    isActive: this.props.value === undefined ? false : true,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    const text = e.target.value;

    this.setState({
      value: text,
      isActive: true,
    });

    if (onChange) {
      onChange(e);
    }
  };

  render() {
    return (
      <HelpTextContainer value={this.state.value} {...this.props}>
        <FieldContainer ref={this.props.innerRef} onChange={e => this.handleChange(e)} {...this.props} />
      </HelpTextContainer>
    );
  }
}

Input.Multiline = Multiline;
Input.Number = Number;
Input.Password = Password;
Input.BaseField = FieldContainer;
Input.BaseInput = BaseInput;
Input.Digit = Digit;
Input.DigitSequence = DigitSequence;
Input.IncrDcr = IncrDcr;

import React from "react";
import { InputHelpTextType } from "../../typings";
import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import IncrDcr from "./IncrDcr";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";
import Base, { BaseReactInputHTMLAttributes, Props as InputProps } from "./__helpers__/Base";
import HelpTextContainer from "./__helpers__/HelpTextContainer";

export type Props = InputProps &
  BaseReactInputHTMLAttributes & {
    helptext?: InputHelpTextType;
    secondhelptext?: InputHelpTextType;
    characterLimit?: boolean;
    // React allows custom Props to be passed only when they are spelled in lowercase
    innerref?: React.RefObject<HTMLInputElement> | any;
  };

type State = {
  id: string;
  value: Props["value"];
  isActive: boolean;
};

export default class Input extends React.Component<Props, State> {
  public static InputBase: typeof Base;

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
    const { inchange } = this.props;

    const text = e.target.value;

    this.setState({
      value: text,
      isActive: true,
    });

    if (inchange) {
      inchange(text);
    }
  };

  render() {
    return (
      <HelpTextContainer value={this.state.value} {...this.props}>
        <Base ref={this.props.innerref} onChange={e => this.handleChange(e)} {...this.props} />
      </HelpTextContainer>
    );
  }
}

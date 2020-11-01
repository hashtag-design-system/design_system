import React from "react";
import { InputHelpTextType } from "../../typings";
import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import IncrDcr from "./IncrDcr";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";
import BaseInput, { Props as InputProps, ReactInputHTMLAttributes } from "./__helpers__/InputBase";
import LabelContainer from "./__helpers__/LabelContainer";

export type Props = InputProps & {
  helpText?: InputHelpTextType;
  secondHelpText?: InputHelpTextType;
  characterLimit?: boolean;
  // React allows custom Props to be passed only when they are spelled in lowercase
  innerref?: React.RefObject<HTMLInputElement> | any;
};

type State = {
  id: string;
  value: Props["value"];
  isActive: boolean;
};

export default class Input extends React.Component<Props & ReactInputHTMLAttributes, State> {
  public static BaseInput: typeof BaseInput;

  public static Multiline: typeof Multiline;

  public static Number: typeof Number;

  public static Password: typeof Password;

  public static Digit: typeof Digit;

  public static DigitSequence: typeof DigitSequence;

  public static IncrDcr: typeof IncrDcr;

  state: State = {
    id: this.props.id || "",
    value: this.props.value || "",
    isActive: this.props.value === undefined ? false : true,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    this.setState({
      value: text,
      isActive: true,
    });

    if (this.props.invalue) {
      this.props.invalue(text);
    }
  };

  render() {
    const { label, helpText, secondHelpText, characterLimit, className, state } = this.props;

    return (
      <div className="input__container" style={{ width: this.props.style?.width || this.props.width }}>
        {(label || helpText) && (
          <LabelContainer
            className="body-12"
            label={label}
            withHelpText={helpText ? true : false}
            withIcon={helpText && helpText.icon ? true : false}
          >
            {helpText?.value}
            {helpText?.icon}
          </LabelContainer>
        )}
        <BaseInput ref={this.props.innerref} {...this.props} />
        {(secondHelpText || this.props.maxLength) && characterLimit && !className?.includes("input-digit") && (
          <LabelContainer
            className="body-12"
            withHelpText
            withIcon={secondHelpText && secondHelpText.icon ? true : false}
            charactersLimit={{ maxLength: this.props.maxLength, characters: String(this.state.value).length }}
            error={state === "error"}
            style={{ marginLeft: `${label || helpText ? "0px" : "12px"}` }}
          >
            {secondHelpText?.icon}
            {secondHelpText?.value}
          </LabelContainer>
        )}
      </div>
    );
  }
}

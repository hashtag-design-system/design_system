import React from "react";
import errors from "../../config/errors";
import { IconPropType, InputHelpTextType } from "../../typings";
import { generateId } from "../../utils";
import { addClassnames } from "../../utils/styles";
import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import FloatingLabel from "./FloatingLabel";
import LabelContainer from "./LabelContainer";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";

const InputStates = ["default", "focused", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];
const InputTypes = ["text", "email", "hidden", "number", "password", "search", "url"] as const;
export type InputType = typeof InputTypes[number];
export type ReactInputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export type Props = {
  placeholder?: string;
  floatingPlaceholder?: boolean;
  type?: InputType;
  label?: string;
  defaultValue?: string;
  helpText?: InputHelpTextType;
  secondHelpText?: InputHelpTextType;
  icon?: IconPropType;
  allowClear?: boolean;
  state?: InputState;
};

type State = {
  id: string;
  value?: string;
  isActive: boolean;
};

export default class Input extends React.Component<Props & ReactInputHTMLAttributes, State> {
  public static Multiline: typeof Multiline;

  public static Number: typeof Number;

  public static Password: typeof Password;

  public static Digit: typeof Digit;

  public static DigitSequence: typeof DigitSequence;

  state: State = {
    id: this.props.id || "",
    value: this.props.defaultValue || undefined,
    isActive: this.props.defaultValue === undefined ? false : true,
  };

  // Generate a unique ID ofr the form element, if not provided
  componentDidMount() {
    if (!this.props.id) {
      this.setState({
        id: generateId({
          length: 5,
          specialCharacters: "-_",
        }),
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    this.setState({
      value: text,
      isActive: true,
    });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      isActive: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      this.setState({
        isActive: false,
      });
    }
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  // focus = () => {
  // ReactDOM.findDOMNode(this.refs.input).focus();
  // };

  render() {
    let {
      placeholder,
      floatingPlaceholder = true,
      type = "text",
      label,
      defaultValue,
      state = "default",
      icon,
      helpText,
      secondHelpText,
      allowClear = false,
      className,
      disabled,
      ...rest
    } = this.props;
    const { id, isActive, value } = this.state;

    let classNames = addClassnames(`input ${floatingPlaceholder ? "floating " : ""}input-placeholder-font`, this.props);
    if (state !== "default") {
      classNames += ` ${state}`;
    }

    // TODO: set icon to the clear icon component
    // TODO: if maxLength then show character limit, in Input.Multiline
    // Check and change (re-validate) Props
    if (allowClear && icon) {
      throw new Error(errors.allowClearAndIcon);
    }
    if (floatingPlaceholder && label) {
      throw new Error(errors.floatingPlaceholderAndLabel);
    }
    if (state === "error") {
    }

    if (type === "hidden") {
      return null;
    }

    return (
      <div className="input__container" style={{ width: this.props.style?.width || this.props.width }}>
        {(label || helpText) && (
          <LabelContainer
            label={label}
            withHelpText={helpText ? true : false}
            withIcon={helpText && helpText.icon ? true : false}
          >
            {helpText?.value}
            {helpText?.icon}
          </LabelContainer>
        )}
        <div className="input__field-container">
          <input
            id={id}
            type={type}
            className={classNames}
            placeholder={!floatingPlaceholder ? placeholder : undefined}
            value={value}
            onChange={e => this.handleChange(e)}
            onFocus={e => this.handleFocus(e)}
            onBlur={e => this.handleBlur(e)}
            disabled={disabled || rest["aria-disabled"] === "true" ? true : false || classNames.includes("disabled")}
            {...rest}
          />

          {floatingPlaceholder && (
            <FloatingLabel id={id} isActive={isActive}>
              {placeholder}
            </FloatingLabel>
          )}
          {icon}
        </div>
        {secondHelpText && (
          <LabelContainer
            withHelpText
            withIcon={secondHelpText && secondHelpText.icon ? true : false}
            error={state === "error"}
            style={{ marginLeft: `${label || helpText ? "0px" : "12px"}` }}
          >
            {secondHelpText?.icon}
            {secondHelpText.value}
          </LabelContainer>
        )}
      </div>
    );
  }
}

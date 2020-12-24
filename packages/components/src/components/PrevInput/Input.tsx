import React from "react";
import { ComponentProps } from "../__helpers__";
import { InputBaseFProps } from "./index";
import BaseInput from "./__helpers__/BaseInput";
import FieldContainer from "./__helpers__/FieldContainer";
import HelpTextContainer from "./__helpers__/HelpTextContainer";

// React allows custom Props to be passed only when they are spelled in lowercase
export type Props = {
  helptext?: { value: string; icon?: React.ReactNode };
  secondhelptext?: { value: string; icon?: React.ReactNode };
  characterLimit?: boolean;
};

export type FProps = Props & InputBaseFProps & ComponentProps<"input", true>;

type State = {
  id: string;
  value: FProps["value"];
  isActive: boolean;
};

export default class Input extends React.Component<FProps, State> {
  public static BaseField: typeof FieldContainer;

  public static BaseInput: typeof BaseInput;

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
        <FieldContainer ref={this.props.ref} onChange={e => this.handleChange(e)} {...this.props} />
      </HelpTextContainer>
    );
  }
}

Input.BaseField = FieldContainer;
Input.BaseInput = BaseInput;

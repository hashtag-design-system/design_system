import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import IncrDcr from "./IncrDcr";
import Input from "./Input";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";
import BaseField from "./__helpers__/BaseField";
import BaseInput from "./__helpers__/BaseInput";

export type { Props as DigitInputProps } from "./Digit";
export type { Props as DigitSequenceInputProps } from "./DigitSequence";
export type { Props as IncrDcrInputProps } from "./IncrDcr";
export type { Props as InputProps } from "./Input";
export type { Props as MultilineInputProps } from "./Multiline";
export type { Props as NumberInputProps } from "./Number";
export type { Props as PasswordInputProps } from "./Password";
export type { InputState, InputType, Props as InputBaseProps } from "./__helpers__/BaseField";

Input.Multiline = Multiline;
Input.Number = Number;
Input.Password = Password;
Input.BaseField = BaseField;
Input.BaseInput = BaseInput;
Input.Digit = Digit;
Input.DigitSequence = DigitSequence;
Input.IncrDcr = IncrDcr;

export default Input;

import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import IncrDcr from "./IncrDcr";
import Input from "./Input";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";
import InputBase from "./__helpers__/InputBase";

export type { Props as DigitInputProps } from "./Digit";
export type { Props as DigitSequenceInputProps } from "./DigitSequence";
export type { Props as IncrDcrInputProps } from "./IncrDcr";
export type { Props as InputProps } from "./Input";
export type { Props as MultilineInputProps } from "./Multiline";
export type { Props as NumberInputProps } from "./Number";
export type { Props as PasswordInputProps } from "./Password";
export type { InputState, InputType, Props as InputBaseProps, ReactInputHTMLAttributes } from "./__helpers__/InputBase";

Input.Multiline = Multiline;
Input.Number = Number;
Input.Password = Password;
Input.InputBase = InputBase;
Input.Digit = Digit;
Input.DigitSequence = DigitSequence;
Input.IncrDcr = IncrDcr;

export default Input;

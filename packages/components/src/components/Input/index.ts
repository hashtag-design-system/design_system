import Digit from "./Digit";
import DigitSequence from "./DigitSequence";
import Input from "./Input";
import Multiline from "./Multiline";
import Number from "./Number";
import Password from "./Password";

export type { Props as DigitInputProps } from "./Digit";
export type { Props as DigitSequenceInputProps } from "./DigitSequence";
export type { InputState, InputType, Props as InputProps } from "./Input";
export type { Props as MultilineInputProps } from "./Multiline";
export type { Props as NumberInputProps } from "./Number";
export type { Props as PasswordInputProps } from "./Password";

Input.Multiline = Multiline;
Input.Number = Number;
Input.Password = Password;
Input.Digit = Digit;
Input.DigitSequence = DigitSequence;

export default Input;

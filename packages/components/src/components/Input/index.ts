import Input from "./Input";
import Multiline from "./Multiline";
import Password from "./Password";

export type { InputState, InputType, Props as InputProps } from "./Input";
export type { Props as MultilineInputProps } from "./Multiline";
export type { Props as PasswordInputProps } from "./Password";

Input.Multiline = Multiline;
Input.Password = Password;

export default Input;

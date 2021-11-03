import React from "react";
import { useForm, UseFormProps } from "react-hook-form";
import { ComponentProps } from "../__helpers__";
import { Control, Label, ErrorMessage, HelperText } from "./chakra";
import Group from "./Group";
import Header from "./Header";

export type Props = {
  defaultValues?: UseFormProps["defaultValues"];
};

export type FProps = Props & ComponentProps<"form">;

type SubComponents = {
  Group: typeof Group;
  Header: typeof Header;
  Control: typeof Control;
  Label: typeof Label;
  ErrorMessage: typeof ErrorMessage;
  HelperText: typeof HelperText;
};

const Form: React.FC<FProps> & SubComponents = ({ defaultValues, onSubmit, children, ...props }) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit as any)} data-testid="form" {...props}>
      <Group>
        {React.Children.map(children as React.ReactElement[], child => {
          if (child) {
            const name = child.props.name;
            return name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    defaultValue: defaultValues && defaultValues[name],
                    forwardref: register,
                    key: name,
                  },
                })
              : child;
          }
        })}
      </Group>
    </form>
  );
};

Form.displayName = "Form";
Form.Group = Group;
Form.Header = Header;
Form.Control = Control;
Form.ErrorMessage = ErrorMessage;
Form.Label = Label;
Form.HelperText = HelperText;

export default Form;

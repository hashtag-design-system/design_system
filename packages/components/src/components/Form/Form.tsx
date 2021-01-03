import React from "react";
import { useForm, UseFormOptions } from "react-hook-form";
import { ComponentProps } from "../__helpers__";
import Group from "./Group";
import Header from "./Header";

export type Props = {
  defaultValues?: UseFormOptions["defaultValues"];
};

export type FProps = Props & ComponentProps<"form">;

type SubComponents = {
  Group: typeof Group;
  Header: typeof Header;
};

const Form: React.FC<FProps> & SubComponents = ({ defaultValues, onSubmit, children, ...props }) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} data-testid="form" {...props}>
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

export default Form;

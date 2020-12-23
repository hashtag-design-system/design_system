import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Input, { InputNumberFProps } from "../index";

export default {
  title: `${titleGroups.FORM_INPUT}/Number`,
  component: Input.Number,
  argTypes: {
    defaultValue: {
      control: {
        type: "text",
      },
    },
    floatingplaceholder: {
      control: {
        type: "boolean",
      },
    },
    prefix: {
      control: {
        type: "text",
      },
    },
    suffix: {
      control: {
        type: "text",
      },
    },
    min: {
      control: {
        type: "number",
      },
    },
    max: {
      control: {
        type: "number",
      },
    },
  },
} as Meta;

const Template: Story<InputNumberFProps> = ({ placeholder, floatingplaceholder = false, ...args }) => (
  <Input.Number placeholder={placeholder} floatingplaceholder={floatingplaceholder} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Hover = Template.bind({});
Hover.args = {
  state: "hover",
};

export const Focus = Template.bind({});
Focus.args = {
  state: "focus",
};

export const Success = Template.bind({});
Success.args = {
  state: "success",
};

export const Error = Template.bind({});
Error.args = {
  state: "error",
};

export const Disabled = Template.bind({});
Disabled.args = {
  state: "disabled",
};

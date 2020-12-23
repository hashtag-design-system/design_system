import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Input, { InputPasswordSBProps } from "../index";

export default {
  title: `${titleGroups.FORM_INPUT}/Password`,
  component: Input.Password,
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
    maxLength: {
      control: {
        type: "number",
      },
    },
  },
} as Meta;

const Template: Story<InputPasswordSBProps> = ({ placeholder = "Password", floatingplaceholder = true, ...args }) => (
  <Input.Password placeholder={placeholder} floatingplaceholder={floatingplaceholder} {...args} />
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

import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Input, { InputDigitFProps } from "../index";

export default {
  title: `${storybookTitles.FORM_INPUT}/Digit`,
  component: Input.Digit,
  argTypes: {
    defaultValue: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const Template: Story<InputDigitFProps> =  args  => <Input.Digit {...args} />;

export const Default = Template.bind({});
Default.args = {
  state: "default",
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

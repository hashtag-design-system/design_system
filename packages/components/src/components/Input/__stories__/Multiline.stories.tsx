import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Input from "../index";

export default {
  title: `${storybookTitles.FORM_INPUT}/Multiline`,
  component: Input.Multiline,
  argTypes: {
    floatingplaceholder: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

const Template: Story = ({ placeholder = "Placeholder", floatingplaceholder = true, ...args }) => (
  <Input.Multiline placeholder={placeholder} floatingplaceholder={floatingplaceholder} {...args} />
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

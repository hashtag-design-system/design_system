import { Meta, Story } from "@storybook/react";
import Input, { InputProps } from "../index";

export default {
  title: "Input2",
  component: Input,
  argTypes: {
    // defaultValue: {
    //   control: { type: "text" },
    // },
    // hasFloatingPlaceholder: {
    //   control: { type: "boolean" },
    // },
    // maxLength: {
    //   control: { type: "number" },
    // },
  },
} as Meta;

const Template: Story<InputProps> = ({ placeholder = "Placeholder", hasFloatingPlaceholder = true, ...args }) => (
  <Input placeholder={placeholder} hasFloatingPlaceholder={hasFloatingPlaceholder} {...args} />
);

export const Default = Template.bind({});
export const Hover = Template.bind({});
Hover.args = {
  placeholder: "hey"
}

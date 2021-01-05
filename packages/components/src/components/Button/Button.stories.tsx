import { Meta, Story } from "@storybook/react";
import Button, { ButtonSBProps } from "./index";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Button",
      control: "text",
    },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<ButtonSBProps> = ({ children, ...args }) => <Button {...args}>{children}</Button>;

export const Default = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

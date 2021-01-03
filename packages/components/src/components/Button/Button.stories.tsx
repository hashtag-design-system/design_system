import { Meta, Story } from "@storybook/react";
import Button, { ButtonFProps } from "./index";

export default {
  title: "Button",
  component: Button,
  args: {
    children: "Button",
  },
} as Meta;

const Template: Story<ButtonFProps> = ({ children, ...args }) => (
  <Button onClick={() => console.log("clicked")} {...args}>
    {children}
  </Button>
);

export const Default = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

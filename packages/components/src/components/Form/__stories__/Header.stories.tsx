import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Form, { FormHeaderFProps } from "../index";

export default {
  title: `${storybookTitles.FORM_FORM}/Header`,
  component: Form.Header,
  argTypes: {
    children: {
      defaultValue: "Header",
      control: "text",
    },
  },
} as Meta;

const Template: Story<FormHeaderFProps> = ({ children, ...args }) => <Form.Header {...args}>{children}</Form.Header>;

export const Default = Template.bind({});
Default.args = {
  withBorder: true,
};

export const WithoutBorder = Template.bind({});
WithoutBorder.args = {
  withBorder: false,
};
WithoutBorder.storyName = "Without border";

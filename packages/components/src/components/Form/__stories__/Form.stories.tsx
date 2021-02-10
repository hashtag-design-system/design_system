import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Button from "../../Button";
import Input from "../../Input";
import Form, { FormProps } from "../index";

export default {
  title: `${storybookTitles.FORM_FORM}/Form`,
  component: Form,
  argTypes: {
    onSubmit: { action: "submitted" },
  },
} as Meta;

const Template: Story<FormProps> = args => (
  <Form {...args}>
    <Input name="text" placeholder="Placeholder" floatingplaceholder={true} />
    <Input.Number name="number" state="default" />
    <Button type="submit">Submit</Button>
  </Form>
);

export const Default = Template.bind({});

export const WithDefaultValues = Template.bind({});
WithDefaultValues.args = {
  defaultValues: { text: "Storybook", number: "5" },
};
WithDefaultValues.storyName = "With defualt values";

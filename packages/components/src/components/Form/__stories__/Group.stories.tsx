import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Input from "../../Input";
import Form, { FormGroupProps } from "../index";

export default {
  title: `${storybookTitles.FORM_FORM}/Group`,
  component: Form.Group,
} as Meta;

const Template: Story<FormGroupProps> = () => (
  <Form.Group>
    <Input name="text" placeholder="Placeholder" floatingplaceholder={true} />
    <Input.Number name="number" state="default" />
  </Form.Group>
);

export const Default = Template.bind({});

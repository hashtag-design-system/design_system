import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Input, { InputDigitSequenceFProps } from "../index";

export default {
  title: `${storybookTitles.FORM_INPUT}/DigitSequence`,
  component: Input.DigitSequence,
  args: {
    numberOfDigits: 4,
  },
} as Meta;

const Template: Story<InputDigitSequenceFProps> = ({ numberOfDigits, ...args }) => (
  <Input.DigitSequence numberOfDigits={numberOfDigits} {...args} />
);

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
};

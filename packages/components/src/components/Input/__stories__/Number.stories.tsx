import { NumberInputStepper } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import Input, { InputNumberGroupProps } from "../index";

export default {
  title: `Number`,
  component: Input.Number,
  argTypes: {
    placeholder: {
      name: "placeholder",
      control: { type: "text" },
      defaultValue: "Placeholder"
    },
    hasFloatingPlaceholder: {
      control: { type: "boolean" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
  },
} as Meta;

const Template: Story<InputNumberGroupProps> = ({ placeholder, hasFloatingPlaceholder = false, ...args }) => (
  <Input.NumberGroup
    format={val => "$" + val}
    max={20}
    placeholder={placeholder}
    defaultValue={15}
    onChange={newVal => console.log(newVal)}
    {...args}
  >
    <Input.Number onChange={newVal => console.log(newVal.target.value)} />
    <NumberInputStepper>
      <Input.NumberStepper type="increment" />
      <Input.NumberStepper type="decrement" />
    </NumberInputStepper>
  </Input.NumberGroup>
);

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

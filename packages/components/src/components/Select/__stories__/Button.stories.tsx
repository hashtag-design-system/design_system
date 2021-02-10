import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Select, { SelectButtonSBProps } from "../index";

export default {
  title: `${storybookTitles.FORM_SELECT}/Button`,
  component: Select.Button,
} as Meta;

const Template: Story<SelectButtonSBProps> = args => (
  <Select>
    <Select.Button style={{ width: "200px" }} {...args}>
      Projects
    </Select.Button>
  </Select>
);

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Hover = Template.bind({});
Hover.args = {
  state: "hover",
};

export const FocusVisible = Template.bind({});
FocusVisible.args = {
  state: "focus-visible",
};
FocusVisible.storyName = "Focus-visible";

export const Disabled = Template.bind({});
Disabled.args = {
  state: "disabled",
};

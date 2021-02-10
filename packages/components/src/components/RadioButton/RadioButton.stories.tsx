import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../config";
import { SelectionInputStates } from "../__helpers__";
import RadioButton, { RadioButtonFProps } from "./index";

export default {
  title: `${storybookTitles.FORM}/RadioButton`,
  component: RadioButton,
  argTypes: {
    state: {
      control: {
        type: "select",
        options: SelectionInputStates,
      },
    },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<RadioButtonFProps> = args => <RadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Pressed = Template.bind({});
Pressed.args = {
  state: "pressed",
};

export const FocusVisible = Template.bind({});
FocusVisible.args = {
  state: "focus-visible",
};
FocusVisible.storyName = "Focus-visible";

export const Checked = Template.bind({});
Checked.args = {
  state: "checked",
};

export const DisabledUnchecked = Template.bind({});
DisabledUnchecked.args = {
  state: "disabled|unchecked",
};
DisabledUnchecked.storyName = "Disabled | unchecked";

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  state: "disabled|checked",
};
DisabledChecked.storyName = "Disabled | checked";

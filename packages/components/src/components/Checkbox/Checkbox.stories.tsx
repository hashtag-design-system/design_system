import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../config/storybook";
import { CheckboxStates } from "./Checkbox";
import Checkbox, { CheckboxFProps } from "./index";

export default {
  title: `${titleGroups.FORM}/Checkbox`,
  component: Checkbox,
  argTypes: {
    state: {
      control: {
        type: "select",
        options: CheckboxStates,
      },
    },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<CheckboxFProps> = args => <Checkbox incheck={isChecked => console.log(isChecked)} {...args} />;

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

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  state: "indeterminate",
};

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

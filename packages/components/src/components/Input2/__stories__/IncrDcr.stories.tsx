import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Input, { InputIncrDcrFProps } from "../index";

export default {
  title: `${storybookTitles.FORM_INPUT}/IncrDcr`,
  component: Input.IncrDcr,
  argTypes: {
    defaultValue: {
      control: {
        type: "text",
      },
    },
    min: {
      control: {
        type: "number",
      },
    },
    max: {
      control: {
        type: "number",
      },
    },
  },
} as Meta;

const Template: Story<InputIncrDcrFProps> = ({ placeholder, ...args }) => <Input.IncrDcr placeholder={placeholder} {...args} />;

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Hover = Template.bind({});
Hover.args = {
  state: "hover",
};

export const HoverIncrease = Template.bind({});
HoverIncrease.args = {
  state: "hover|increase",
};
HoverIncrease.storyName = "Hover | increase";

export const HoverDecrease = Template.bind({});
HoverDecrease.args = {
  state: "hover|decrease",
};
HoverDecrease.storyName = "Hover | decrease";

export const Active = Template.bind({});
Active.args = {
  state: "active",
};

export const ActiveIncrease = Template.bind({});
ActiveIncrease.args = {
  state: "active|increase",
};
ActiveIncrease.storyName = "Active | increase";

export const ActiveDecrease = Template.bind({});
ActiveDecrease.args = {
  state: "active|decrease",
};
ActiveDecrease.storyName = "Active | increase";

export const Focus = Template.bind({});
Focus.args = {
  state: "focus",
};

export const FocusVisibleIncrease = Template.bind({});
FocusVisibleIncrease.args = {
  state: "focus-visible|increase",
};
FocusVisibleIncrease.storyName = "Focus-visible | increase";

export const FocusVisibleDecrease = Template.bind({});
FocusVisibleDecrease.args = {
  state: "focus-visible|decrease",
};
FocusVisibleDecrease.storyName = "Focus-visible | decrease";

export const Disabled = Template.bind({});
Disabled.args = {
  state: "disabled",
};
